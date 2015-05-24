/**
 * Wraps the ramdon-js JavaScript plugin as an importable module,
 * compatible with ember-cli's structure.
 *
 * @method randomWrapper
 * @return {Random}
 */
export default function randomWrapper() {
  return window.Random;
}
