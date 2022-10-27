attribute vec3 aVertexPosition;

uniform vec3 uObjectColor;
uniform mat4 uMMatrix;
uniform mat4 uPVMatrix;

varying vec3 vVertexColor;

void main(void) {
	gl_Position = uPVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
	vVertexColor = uObjectColor / 255.0;
}
