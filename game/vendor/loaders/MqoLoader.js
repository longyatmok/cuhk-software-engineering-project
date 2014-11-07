/**
* load extarnel vendor MqoLoader, MqoModel, etc
* 
*/

var THREE = require('../Three');
var Physijs = require('../Physi');
var MqoLoader = {};

MqoLoader.load = function(url, callback) {
	var self = this;
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.onload = function() {
		MqoLoader.parse(req.responseText, callback);
	};
	req.send(null);
};

MqoLoader.parse = function(text, callback) {
	var mqoModel = new MqoModel();
	mqoModel.parse(text);
	
	if (callback) {
		callback(mqoModel);
	}
	return mqoModel;
}

var MqoModel = function() {
	this.meshes = Array();
	this.material = null;
};

MqoModel.prototype.parse = function (text) {
    // オブジェクトをパース
    // pass object
	var objectTextList = text.match(/^Object [\s\S]*?^\}/gm);

	for ( var i = 0, len = objectTextList.length; i < len; ++i) {
		var objectText = objectTextList[i];
		var mesh = new MqoMesh();
		mesh.parse(objectText);
		this.meshes.push(mesh);
	}

	// マテリアル
    // material
	var materialText = text.match(/^Material [\s\S]*?^\}/m);

	this.material = new MqoMaterial();
	if (materialText) {
		this.material.parse(materialText[0]);
	}
}

/**
 * メタセコメッシュ Metasequoia
 */
var MqoMesh = function() {
	this.name = ''; // 名前
	this.vertices = []; // 頂点
	this.faces = []; // 面情報
	this.vertNorms = []; // 頂点法線

	this.facet = 59.5; // スムージング角度
	this.depth = 0; // 階層の深さ
	this.mirror = 0;
	this.mirrorAxis = 0;
};

MqoMesh.prototype.parse = function(text) {
	// 名前
	var name = text.match(/^Object[\s\S]+\"([^\"]+)?\"/);
	if (name) {
		this.name = name[1];
	}

	// スムージング角
	var facet = text.match(/facet ([0-9\.]+)/);
	if (facet) {
		this.facet = Number(facet[1]);
	}

	// 階層の深さ
	var depth = text.match(/depth ([0-9\.]+)/);
	if (depth) {
		this.depth = Number(depth[1]);
	}

	// ミラー
	var mirror = text.match(/mirror ([0-9])/m);
	if (mirror) {
		this.mirror = Number(mirror[1]);
		// 軸
		var mirrorAxis = text.match(/mirror_axis ([0-9])/m);
		if (mirrorAxis) {
			this.mirrorAxis = Number(mirrorAxis[1]);
		}
	}

	var vertex_txt = text.match(/vertex ([0-9]+).+\{\s([\w\W]+)}$/gm);
	this._parseVertices(RegExp.$1, RegExp.$2);

	var face_txt = text.match(/face ([0-9]+).+\{\s([\w\W]+)}$/gm);
	this._parseFaces(RegExp.$1, RegExp.$2);
};

MqoMesh.prototype._parseVertices = function(num, text) {
	var vertexTextList = text.split('\n');
	for ( var i = 1; i <= num; ++i) {
		var vertex = vertexTextList[i].split(' ');
		vertex[0] = Number(vertex[0]);
		vertex[1] = Number(vertex[1]);
		vertex[2] = Number(vertex[2]);
		this.vertices.push(vertex);
	}

	if (this.mirror) {
		var self = this;
		var toMirror = (function() {
			return {
				1 : function(v) {
					return [ v[0] * -1, v[1], v[2] ];
				},
				2 : function(v) {
					return [ v[0], v[1] * -1, v[2] ];
				},
				4 : function(v) {
					return [ v[0], v[1], v[2] * -1 ];
				}
			}[self.mirrorAxis];
		})();

		var len = this.vertices.length;
		for ( var i = 0; i < len; ++i) {
			this.vertices.push(toMirror(this.vertices[i]));
		}
	}
};

MqoMesh.prototype._parseFaces = function(num, text) {
	var faceTextList = text.split('\n');

	var calcNormalize = function(a, b, c) {
		var v1 = [ a[0] - b[0], a[1] - b[1], a[2] - b[2] ];
		var v2 = [ c[0] - b[0], c[1] - b[1], c[2] - b[2] ];

		var v3 = [ v1[1] * v2[2] - v1[2] * v2[1],
				v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0] ];
		var len = Math.sqrt(v3[0] * v3[0] + v3[1] * v3[1] + v3[2] * v3[2]);
		v3[0] /= len;
		v3[1] /= len;
		v3[2] /= len;

		return v3;
	};

	for ( var i = 1; i <= num; ++i) {
		// トリムっとく
		var faceText = faceTextList[i].replace(/^\s+|\s+$/g, '');
		// 面の数
		var vertex_num = Number(faceText[0]);

		var info = faceText.match(/([A-Za-z]+)\(([\w\s\-\.\(\)]+?)\)/gi);
		var face = {
			vNum : vertex_num
		};

		for ( var j = 0, len = info.length; j < len; ++j) {
			var m = info[j].match(/([A-Za-z]+)\(([\w\s\-\.\(\)]+?)\)/);
			var key = m[1].toLowerCase();
			var value = m[2].split(' ');
			value.forEach(function(elm, i, arr) {
				arr[i] = Number(elm);
			});
			face[key] = value;
		}

		// UV デフォルト値
		if (!face.uv) {
			face.uv = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
		}

		// マテリアル デフォルト値
		if (!face.m)
			face.m = [ undefined ];

		// 法線計算
		if (face.v.length === 3) {
			face.n = calcNormalize(this.vertices[face.v[0]],
					this.vertices[face.v[1]], this.vertices[face.v[2]]);
		} else {
			face.n = [ 0, 0, 0 ];
		}

		this.faces.push(face);
	}

	// ミラー対応
	if (this.mirror) {
		var swap = function(a, b) {
			var temp = this[a];
			this[a] = this[b];
			this[b] = temp;
			return this;
		};
		var len = this.faces.length;
		var vertexOffset = (this.vertices.length / 2);
		for ( var i = 0; i < len; ++i) {
			var targetFace = this.faces[i];
			var face = {
				uv : [],
				v : [],
				vNum : targetFace.vNum
			};
			for ( var j = 0; j < targetFace.v.length; ++j) {
				face.v[j] = targetFace.v[j] + vertexOffset;
			}
			for ( var j = 0; j < targetFace.uv.length; ++j) {
				face.uv[j] = targetFace.uv[j];
			}

			if (face.vNum === 3) {
				swap.call(face.v, 1, 2);
				swap.call(face.uv, 2, 4);
				swap.call(face.uv, 3, 5);
			} else {
				swap.call(face.v, 0, 1);
				swap.call(face.uv, 0, 2);
				swap.call(face.uv, 1, 3);

				swap.call(face.v, 2, 3);
				swap.call(face.uv, 4, 6);
				swap.call(face.uv, 5, 7);
			}

			face.n = targetFace.n;
			face.m = targetFace.m;

			this.faces.push(face);
		}
	}

	// 頂点法線を求める
	var vertNorm = Array(this.vertices.length);
	for ( var i = 0, len = this.vertices.length; i < len; ++i)
		vertNorm[i] = [];

	for ( var i = 0; i < this.faces.length; ++i) {
		var face = this.faces[i];
		var vIndices = face.v;

		for ( var j = 0; j < face.vNum; ++j) {
			var index = vIndices[j];
			vertNorm[index].push.apply(vertNorm[index], face.n);
		}
	}

	for ( var i = 0; i < vertNorm.length; ++i) {
		var vn = vertNorm[i];
		var result = [ 0, 0, 0 ];
		var len = vn.length / 3;
		0
		for ( var j = 0; j < len; ++j) {
			result[0] += vn[j * 3 + 0];
			result[1] += vn[j * 3 + 1];
			result[2] += vn[j * 3 + 2];
		}

		result[0] /= len;
		result[1] /= len;
		result[2] /= len;

		var len = Math.sqrt(result[0] * result[0] + result[1] * result[1]
				+ result[2] * result[2]);
		result[0] /= len;
		result[1] /= len;
		result[2] /= len;

		this.vertNorms[i] = result;
	}
};

/**
 * メタセコ用マテリアル
 */
var MqoMaterial = function() {
	this.materialList = [];

	// デフォルト
	this.materialList[undefined] = {
		col : [ 1, 1, 1, 1 ]
	};
};

MqoMaterial.prototype.parse = function(text) {
	var infoText = text.match(/^Material [0-9]* \{\r\n([\s\S]*?)\n^\}$/m);
	var matTextList = infoText[1].split('\n');

	for ( var i = 0, len = matTextList.length; i < len; ++i) {
		var mat = {};
		// トリムっとく
		var matText = matTextList[i].replace(/^\s+|\s+$/g, '');
		var info = matText.match(/([A-Za-z]+)\(([\w\W]+?)\)/gi);

		for ( var j = 0, len2 = info.length; j < len2; ++j) {
			var m = info[j].match(/([A-Za-z]+)\(([\w\W]+?)\)/);
			var key = m[1].toLowerCase();
			var value = null;

			if (key != 'tex') {
				value = m[2].split(' ');
				value.forEach(function(elm, i, arr) {
					arr[i] = Number(elm);
				});
			} else {
				value = m[2].replace(/"/g, '');
			}
			mat[key] = value;
		}
		this.materialList.push(mat);
	}
}

MqoLoader.toTHREEJS = function(mqo, options , className) {
	if (!options) {
		options = {};
	}

	var texturePath = options.texturePath || '.';
	var MaterialConstructor = options.MaterialConstructor
			|| THREE.MeshPhongMaterial;

	var skins = options.skins || null;

	// 親オブジェクトを格納する
	var parentObjects = [];
	if(!className) className = THREE.Mesh;
	parentObjects[0] = new THREE.Object3D

	for ( var i = 0, len = mqo.meshes.length; i < len; ++i) {
		var object, material;

		var mqoMesh = mqo.meshes[i];
		var geometry = generateGeometry(mqoMesh, mqo.material, texturePath,
				MaterialConstructor);

		if (skins) {
			var skin = skins[i];
			geometry.skinIndices = skin.indices;
			geometry.skinWeights = skin.weights;
			geometry.bones = skin.bones

			for ( var j = 0; j < geometry.materials.length; ++j) {
				var gmaterial = geometry.materials[j];
				gmaterial.skinning = true;
			}

			geometry.computeFaceNormals()
			geometry.computeVertexNormals()

			material = new THREE.MeshFaceMaterial(geometry.materials);
			object = new THREE.SkinnedMesh(geometry, material);
		} else {
			geometry.computeFaceNormals()
			geometry.computeVertexNormals()

			material = new THREE.MeshFaceMaterial(geometry.materials);
			object = new className(geometry, material);
		}

		// 親オブジェクトにオブジェクトを登録する
		parentObjects[mqoMesh.depth].add(object);
		// 子オブジェクト保存しておく
		parentObjects[mqoMesh.depth + 1] = object;
	}
	return parentObjects[0];
}

var generateGeometry = function(mqoMesh, mqoMaterials, texturePath,
		MaterialConstructor) {
	var geometry = new THREE.Geometry();

	geometry.name = mqoMesh.name

	// マテリアルリスト
	if (geometry.materials == undefined) {
		geometry.materials = []
	}
	for ( var i = 0; i < mqoMaterials.materialList.length; ++i) {
		var mqoMaterial = mqoMaterials.materialList[i];
		var material = new MaterialConstructor();

		if (material.color) {
			material.color.setRGB(mqoMaterial.col[0] * mqoMaterial.dif,
					mqoMaterial.col[1] * mqoMaterial.dif, mqoMaterial.col[2]
							* mqoMaterial.dif);
		}

		if (material.ambient) {
			material.ambient.setRGB(mqoMaterial.col[0] * mqoMaterial.amb,
					mqoMaterial.col[1] * mqoMaterial.amb, mqoMaterial.col[2]
							* mqoMaterial.amb);
		}

		if (material.specular) {
			material.specular.setRGB(mqoMaterial.col[0] * mqoMaterial.spc,
					mqoMaterial.col[1] * mqoMaterial.spc, mqoMaterial.col[2]
							* mqoMaterial.spc);
		}

		if (mqoMaterial.tex) {
			material.map = THREE.ImageUtils.loadTexture(texturePath + '/'
					+ mqoMaterial.tex);
		}

		material.shiness = mqoMaterial.power;
		material.opacity = mqoMaterial.col[3]

		geometry.materials.push(material);
	}

	// 頂点リスト
	var scaling = 0.01
	for ( var i = 0; i < mqoMesh.vertices.length; ++i) {
		geometry.vertices.push(new THREE.Vector3(
				mqoMesh.vertices[i][0] * scaling, mqoMesh.vertices[i][1]
						* scaling, mqoMesh.vertices[i][2] * scaling));
	}

	// チェック
	var smoothingValue = Math.cos(mqoMesh.facet * Math.PI / 180);
	var checkVertexNormalize = function(n, vn) {
		var c = n[0] * vn[0] + n[1] * vn[1] + n[2] * vn[2];
		return (c > smoothingValue) ? vn : n;
	};

	// indices と uv を作成
	for ( var i = 0; i < mqoMesh.faces.length; ++i) {
		var face = mqoMesh.faces[i];
		var vIndex = face.v;
		var index = geometry.vertices.length;

		if (face.vNum == 3) {
			// 頂点インデックス
			var face3 = new THREE.Face3(vIndex[2], vIndex[1], vIndex[0],
					undefined, undefined, face.m[0]);
			geometry.faces.push(face3);

			// 法線
			var n = face.n;
			var tn = []
			for ( var j = 0; j < 3; ++j) {
				var vn = mqoMesh.vertNorms[vIndex[j]];
				tn.push(checkVertexNormalize(n, vn));
			}

			face3.normal.x = n[0];
			face3.normal.y = n[1];
			face3.normal.z = n[2];

			face3.vertexNormals.push(new THREE.Vector3(tn[2][0], tn[2][1],
					tn[2][2]));
			face3.vertexNormals.push(new THREE.Vector3(tn[1][0], tn[1][1],
					tn[1][2]));
			face3.vertexNormals.push(new THREE.Vector3(tn[0][0], tn[0][1],
					tn[0][2]));

			// UV
			geometry.faceVertexUvs[0].push([
					new THREE.Vector2(face.uv[4], 1.0 - face.uv[5]),
					new THREE.Vector2(face.uv[2], 1.0 - face.uv[3]),
					new THREE.Vector2(face.uv[0], 1.0 - face.uv[1]) ]);
		} else if (face.vNum == 4) {
			var face4 = new THREE.Face4(vIndex[3], vIndex[2], vIndex[1],
					vIndex[0], undefined, undefined, face.m[0]);
			geometry.faces.push(face4);

			// 法線
			var n = face.n;
			var tn = []
			for ( var j = 0; j < 4; ++j) {
				var vn = mqoMesh.vertNorms[vIndex[j]];
				tn.push(checkVertexNormalize(n, vn));
			}

			face4.normal.x = n[0];
			face4.normal.y = n[1];
			face4.normal.z = n[2];

			face4.vertexNormals.push(new THREE.Vector3(tn[3][0], tn[3][1],
					tn[3][2]));
			face4.vertexNormals.push(new THREE.Vector3(tn[2][0], tn[2][1],
					tn[2][2]));
			face4.vertexNormals.push(new THREE.Vector3(tn[1][0], tn[1][1],
					tn[1][2]));
			face4.vertexNormals.push(new THREE.Vector3(tn[0][0], tn[0][1],
					tn[0][2]));

			// UV
			geometry.faceVertexUvs[0].push([
					new THREE.Vector2(face.uv[6], 1.0 - face.uv[7]),
					new THREE.Vector2(face.uv[4], 1.0 - face.uv[5]),
					new THREE.Vector2(face.uv[2], 1.0 - face.uv[3]),
					new THREE.Vector2(face.uv[0], 1.0 - face.uv[1]), ]);
		}
	}

	geometry.computeCentroids();

	return geometry;
};

module.exports = MqoLoader;