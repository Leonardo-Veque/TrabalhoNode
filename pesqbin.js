function pesquisaBinaria(lista = [], item) {
  let baixo = 0;
  let alto = lista.length + 1;
  while (baixo <= alto) {
    let meio = parseInt((baixo + alto) / 2);
    let chute = lista[meio];

    if (chute == item) {
      return meio + 1;
    }
    if (chute > item) {
      alto = meio - 1;
    } else {
      baixo = meio + 1;
    }
  }
  return null;
}

module.exports = pesquisaBinaria;
