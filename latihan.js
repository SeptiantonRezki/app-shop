const input = "aku suka makan nasi";
let stringpotong = input.toLowerCase().replace(/\s/g, "");
let str = input.toLowerCase().replace(/\s/g, "").split("");
let str2 = input.toLowerCase().replace(/\s/g, "").split("").reverse();
console.log(stringpotong);
let hasil = "";
let inputUser = "";
for (let i = 0; i < str.length; i++) {
  // const kondisi = stringpotong.includes(hasil);
  // console.log(kondisi, hasil, stringpotong);
  // ketika nilai pertama betul dan nilai kedua betul
  // cek yang terpanjang

  // jadi ketika kondisi benar => maka => hasil = inputUser
  // ketika false maka => hasil sebelum dikosongi, bandingkan terlebih dahulu, pilih yang paling terpanjang
  inputUser = inputUser + str[str.length - (i + 1)];
  console.log(inputUser, stringpotong.includes(inputUser), hasil);
  if (!stringpotong.includes(inputUser)) {
    // kondisi tidak benar
    inputUser = "";
  }

  if (stringpotong.includes(inputUser)) {
    if (hasil.length <= inputUser.length) {
      hasil = inputUser;
    }
  }
}

const hasilSeleksi = hasil.split("").reverse().join("");

if(hasilSeleksi);
console.log("jalan");
console.log(hasil.split("").reverse().join(""));
