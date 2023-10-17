const chai = require("chai");
const expect = chai.expect;
const pesqbin = require("../pesqbin.js");

describe("Pesqbin", () => {
  it("teste na posicao 1", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 1);
    expect(resultado).to.equal(1);
  });

  it("teste na posicao 2", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 2);
    expect(resultado).to.equal(2);
  });

  it("teste na posicao 3", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 3);
    expect(resultado).to.equal(3);
  });

  it("Teste na posicao 4", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 5);
    expect(resultado).to.equal(4);
  });

  it("Teste na posicao 5", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 8);
    expect(resultado).to.equal(5);
  });

  it("Teste na posicao 6", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 9);
    expect(resultado).to.equal(6);
  });

  it("teste na posicao 7", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 10);
    expect(resultado).to.equal(7);
  });

  it("Numero não existente", () => {
    const resultado = pesqbin([1, 2, 3, 5, 8, 9, 10], 500);
    expect(resultado).to.equal(null);
  });
});
