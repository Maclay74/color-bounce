varying vec2 vUv0;
uniform sampler2D uColorBuffer;
uniform sampler2D uExcludeBuffer;

void main(void) {
    vec4 excluded = texture2D(uExcludeBuffer, vUv0);
    vec4 result = texture2D(uColorBuffer, vUv0);
    gl_FragColor = mix(result, excluded, excluded.a);
}