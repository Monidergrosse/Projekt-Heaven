import Vector3 from './Vector3';
export default class Transform {
    constructor(position, rotation, scale = new Vector3(1, 1, 1)) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}
