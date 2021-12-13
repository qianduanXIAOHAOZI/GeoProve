class Vector {
	constructor() {
		this.pl = [];
	}
	parallel(v) {
		if (this == v) return;
		for (let i of this.pl) 
			if (i == v) return;
		this.pl.push(v);
		for (let i = 0; i < this.pl.length - 1; i++) this.pl[i].parallel(v);
		v.parallel(this);
	}
	isParallel(v) {
		if (this == v) return true;
		for (let i of this.pl) if (i == v) return true;
		return false;
	}
}
class GObject {
	constructor(t) {
		this.type = t;
	}
}
class Point extends GObject {
	constructor() {
		super('p');
	}
}
class SLine extends GObject {
	constructor(point = []) {
		super('s');
		this.point = point;
		this.direction = new Vector();
		this.ndirection = new Vector();
	}
	parallel(s) {
		this.direction.parallel(s.direction);
		this.ndirection.parallel(s.ndirection);
	}
}
class Radial extends GObject {
	constructor(point = []) {
		super('r');
		this.point = point;
		this.direction = new Vector();
	}
}
class Angle extends GObject {
	constructor(v1, v2, point = null) {
		super('a');
		this.v1 = v1;
		this.v2 = v2;
		this.point = point;
	}
	equal(a) {
		if ((this.v1.isParallel(a.v1) && this.v2.isParallel(a.v2)) || (this.v2.isParallel(a.v1) && this.v2.isParallel(a.v1))) return true;
		return false;
	}
}

module.exports.Vector = Vector;
module.exports.GObject = GObject;
module.exports.SLine = SLine;
module.exports.Radial = Radial;
module.exports.Angle = Angle;