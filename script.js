const OUTPUT_ERROR = document.querySelector("#error-text");
const OUTPUT_HASIL_LEXICAL = document.querySelector("#hasil-lexical");
const OUTPUT_HASIL_PARSER = document.querySelector("#hasil-parser");
const INPUT_KATA = document.querySelector("#kata");
const LABEL_KATA = document.querySelector("#kata-label");

function lexicalAnalyzer(kata) {
  const stringInput = `${kata.toLowerCase()}#`;
  let idx_char = 0;
  let state = "q0";
  let current_token = "";
  let textHasil = "";
  const transitionTable = {};

  stateList.forEach((state) => {
    asciiLowercase.forEach((alphabet) => {
      transitionTable[`${state}_${alphabet}`] = "error";
    });
    transitionTable[`${state}_#`] = "error";
    transitionTable[`${state}_ `] = "error";
  });
  transitionTable[`q0_ `] = "q0";
  transitionTable["q3_ "] = "q3";
  transitionTable["q3_#"] = "accept";

  // io
  transitionTable["q0_i"] = "q1";
  transitionTable["q1_o"] = "q2";
  transitionTable["q2_ "] = "q3";
  transitionTable["q2_#"] = "accept";
  transitionTable["q3_i"] = "q1";

  // riso
  transitionTable["q0_r"] = "q4";
  transitionTable["q4_i"] = "q5";
  transitionTable["q5_s"] = "q1";
  transitionTable["q3_r"] = "q4";

  // voi
  transitionTable["q0_v"] = "q18";
  transitionTable["q18_o"] = "q7";
  transitionTable["q7_i"] = "q8";
  transitionTable["q8_ "] = "q3";
  transitionTable["q8_#"] = "accept";
  transitionTable["q3_v"] = "q18";

  // noi
  transitionTable["q0_n"] = "q6";
  transitionTable["q6_o"] = "q7";
  transitionTable["q3_n"] = "q6";

  // bere
  transitionTable["q0_b"] = "q9";
  transitionTable["q9_e"] = "q15";
  transitionTable["q15_r"] = "q16";
  transitionTable["q16_e"] = "q17";
  transitionTable["q17_ "] = "q3";
  transitionTable["q17_#"] = "accept";
  transitionTable["q3_b"] = "q9";

  // mangiare
  transitionTable["q0_m"] = "q10";
  transitionTable["q10_a"] = "q11";
  transitionTable["q11_n"] = "q12";
  transitionTable["q12_g"] = "q13";
  transitionTable["q13_i"] = "q14";
  transitionTable["q14_a"] = "q15";
  transitionTable["q3_m"] = "q10";

  // vestire
  transitionTable["q0_v"] = "q18";
  transitionTable["q18_e"] = "q19";
  transitionTable["q19_s"] = "q20";
  transitionTable["q20_t"] = "q21";
  transitionTable["q21_i"] = "q15";
  transitionTable["q3_v"] = "q18";

  // logorante
  transitionTable["q0_l"] = "q22";
  transitionTable["q22_o"] = "q23";
  transitionTable["q23_g"] = "q24";
  transitionTable["q24_o"] = "q25";
  transitionTable["q25_r"] = "q26";
  transitionTable["q26_a"] = "q27";
  transitionTable["q27_n"] = "q28";
  transitionTable["q28_t"] = "q16";
  transitionTable["q3_l"] = "q22";

  // acqua
  transitionTable["q0_a"] = "q29";
  transitionTable["q29_c"] = "q30";
  transitionTable["q30_q"] = "q31";
  transitionTable["q31_u"] = "q32";
  transitionTable["q32_a"] = "q33";
  transitionTable["q33_ "] = "q3";
  transitionTable["q33_#"] = "accept";
  transitionTable["q3_a"] = "q29";

  // bibita
  transitionTable["q9_i"] = "q34";
  transitionTable["q34_b"] = "q35";
  transitionTable["q35_i"] = "q36";
  transitionTable["q36_t"] = "q32";
  transitionTable["q3_b"] = "q9";

  console.log(transitionTable);

  while (state !== "accept") {
    const current_char = stringInput.charAt(idx_char);
    current_token += current_char;
    state = transitionTable[`${state}_${current_char}`];
    if (state === "q3") {
      // textHasil += `current token : ${current_token}| VALID<br>`;
      console.log(`current token : ${current_token}|VALID`);
      current_token = "";
    }
    if (state === "error") {
      console.log("error!!!!");
      OUTPUT_ERROR.innerHTML = "Error!, kalimat tidak sesuai ";
      LABEL_KATA.classList.add("text-danger");
      INPUT_KATA.classList.add("is-invalid");
      LABEL_KATA.classList.remove("text-success");
      INPUT_KATA.classList.remove("is-valid");
      OUTPUT_HASIL_LEXICAL.classList.add("d-none");
      break;
    } else {
      OUTPUT_ERROR.innerHTML = "";
      LABEL_KATA.classList.remove("text-danger");
      INPUT_KATA.classList.remove("is-invalid");
      LABEL_KATA.classList.add("text-success");
      INPUT_KATA.classList.add("is-valid");
      OUTPUT_HASIL_LEXICAL.classList.remove("d-none");
    }
    idx_char = idx_char + 1;
  }
  if (state === "accept") {
    textHasil += `Input <b>${stringInput.slice(
      0,
      -1
    )}</b> diterima, sesuai daftar kata - kata<br>`;
    console.log(`current token : ${stringInput}   VALIDdd`);
  }

  OUTPUT_HASIL_LEXICAL.innerHTML = `<h5>Hasil Lexical Analyzer: </h5><p>${textHasil}<p>`;
}

function parser(kataParser) {
  const tokenParser = kataParser.toLowerCase().split(" ");
  const nonTerminals = ["S", "NN", "VB"];
  const terminals = [
    "io",
    "voi",
    "noi",
    "acqua",
    "bibita",
    "riso",
    "vestire",
    "mangiare",
    "bere",
    "logorante",
  ];
  const parseTable = {};
  const stack = [];
  let textHasil = "";

  tokenParser.push("EOS");
  stack.push("#");
  stack.push("S");

  parseTable["S_io"] = ["NN", "VB", "NN"];
  parseTable["S_voi"] = ["NN", "VB", "NN"];
  parseTable["S_noi"] = ["NN", "VB", "NN"];
  parseTable["S_acqua"] = ["NN", "VB", "NN"];
  parseTable["S_bibita"] = ["NN", "VB", "NN"];
  parseTable["S_riso"] = ["NN", "VB", "NN"];
  parseTable["S_vestire"] = ["NN", "VB", "NN"];
  parseTable["S_mangiare"] = ["error"];
  parseTable["S_bere"] = ["error"];
  parseTable["S_logorante"] = ["error"];
  parseTable["S_EOS"] = ["error"];

  parseTable["NN_io"] = ["io"];
  parseTable["NN_voi"] = ["voi"];
  parseTable["NN_noi"] = ["noi"];
  parseTable["NN_acqua"] = ["acqua"];
  parseTable["NN_bibita"] = ["bibita"];
  parseTable["NN_riso"] = ["riso"];
  parseTable["NN_vestire"] = ["vestire"];
  parseTable["NN_mangiare"] = ["error"];
  parseTable["NN_bere"] = ["error"];
  parseTable["NN_logorante"] = ["error"];
  parseTable["NN_EOS"] = ["error"];

  parseTable["VB_io"] = ["error"];
  parseTable["VB_voi"] = ["error"];
  parseTable["VB_noi"] = ["error"];
  parseTable["VB_acqua"] = ["error"];
  parseTable["VB_bibita"] = ["error"];
  parseTable["VB_riso"] = ["error"];
  parseTable["VB_vestire"] = ["error"];
  parseTable["VB_mangiare"] = ["mangiare"];
  parseTable["VB_bere"] = ["bere"];
  parseTable["VB_logorante"] = ["logorante"];
  parseTable["VB_EOS"] = ["error"];

  console.log(tokenParser);
  console.log(parseTable);
  console.log(stack);

  let indexToken = 0;
  let symbol = tokenParser[indexToken];

  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    console.log("top    = ", top);
    console.log("symbol = ", symbol);

    if (terminals.includes(top)) {
      console.log("Top adalah symbol terminal");
      if (top === symbol) {
        stack.pop();
        indexToken += 1;
        symbol = tokenParser[indexToken];
        if (symbol === "EOS") {
          console.log(`isi stack: ${stack}`);
          stack.pop();
        }
      } else {
        console.log("error!");
        break;
      }
    } else if (nonTerminals.includes(top)) {
      console.log("Top adalah symbol non-terminal");
      if (parseTable?.[`${top}_${symbol}`]?.[0] !== "error") {
        stack.pop();
        let stbp = parseTable[`${top}_${symbol}`];
        stbp
          ?.slice()
          .reverse()
          .forEach((_, i) => {
            stack.push(stbp[i]);
          });
      } else {
        console.log("errrr");
        console.log("errrr");
        break;
      }
    } else {
      console.log("errrr");
      break;
    }
    console.log(`isi stack: ${stack}`);
    console.log(" ");
  }

  if (symbol === "EOS" && stack.length === 0) {
    console.log(`input ${kataParser} diterima, sesuai grammar`);
    textHasil += `Input <b>${kataParser}</b> diterima, sesuai grammar`;
    OUTPUT_HASIL_PARSER.classList.remove("d-none");
    OUTPUT_HASIL_PARSER.innerHTML = `<h5>Hasil Parser: </h5><p>${textHasil}<p>`;
  } else {
    console.log(
      `Error, input ${kataParser} tidak diterima, tidak sesuai grammar`
    );
    LABEL_KATA.classList.add("text-danger");
    INPUT_KATA.classList.add("is-invalid");
    LABEL_KATA.classList.remove("text-success");
    INPUT_KATA.classList.remove("is-valid");
    OUTPUT_HASIL_PARSER.classList.add("d-none");
    if (OUTPUT_ERROR.innerHTML === "") {
      OUTPUT_ERROR.innerHTML += `Error, input <b>${kataParser}</b> tidak sesuai grammar`;
    } else {
      OUTPUT_ERROR.innerHTML += `& tidak sesuai grammar`;
    }
  }
}

INPUT_KATA.addEventListener("keyup", () => {
  lexicalAnalyzer(INPUT_KATA.value);
  parser(INPUT_KATA.value);

  window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight });
});
