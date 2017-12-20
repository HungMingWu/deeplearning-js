import math from '../math';

function backPropagation(
  costFunc: Function,
  Y: Array<Array<number>>,
  forwardResults: {
    AL: Array<Array<number>>,
    caches: any,
    activationFuncs: Array<string>,
  },
) {
  const { AL, caches, activationFuncs } = forwardResults;
  const l = caches.length;

  const grads: any = {};
  const dAL = costFunc(AL, Y);
  for (let i = l; i > 0; i--) {
    const activationFunc = activationFuncs[i-1];
    const cache = caches[i-1];
    const dA = i === l ? dAL : grads[`dA${i+1}`];
    let dZ = dA;
    switch(activationFunc) {
      case 'relu':
        dZ = math.reluBackward(
          dA, cache.activationCache,
        );
        break;
      case 'sigmoid':
        dZ = math.sigmoidBackward(
          dA, cache.activationCache,
        );
        break;
      case 'linear':
        break;
      default:
        throw new Error('Unsupported activation function');
    }
    const { dAPrev, dW, db } = math.linearBackward(
      dZ, cache.linearCache,
    );
    grads[`dA${i}`] = dAPrev;
    grads[`dW${i}`] = dW;
    grads[`db${i}`] = db;
  }

  return grads;
}

export default backPropagation;