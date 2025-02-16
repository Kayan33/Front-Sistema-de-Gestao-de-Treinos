// Função de validação do CREF
export const validarCREF = (cref) => {
  const regex = /^[0-9]{5,}-[0-9A-Za-z]{1}\/[A-Z]{2}$/;

  return regex.test(cref);
};


// Função de validação de telefone
export const validarTelefone = (telefone) => {
  const regex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
  return regex.test(telefone);
};

export const formatarTelefone = (valor) => {
  const apenasNumeros = valor.replace(/\D/g, '');
  // Adiciona o formato (XX) XXXXX-XXXX
  if (apenasNumeros.length <= 2) {
    return `(${apenasNumeros}`;
  }
  if (apenasNumeros.length <= 7) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
  }
  return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
};

// Função de validação de senha forte
export const validarSenhaForte = (senha) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  return regex.test(senha);
};

export const extrairIdDoYoutube=(url)=> {
  const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

