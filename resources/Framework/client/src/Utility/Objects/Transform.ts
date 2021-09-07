import Vector3 from './Vector3';
export default class Transform {
  constructor(public position: Vector3, public rotation: Vector3, public scale: Vector3 = new Vector3(1, 1, 1)) { }
}