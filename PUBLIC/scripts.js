const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

async function load() {
  const res = await fetch("https://jaovitm-logindb.herokuapp.com/").then(
    (data) => data.json()
  );

  res.urls.map((item) => {
    addElement(item);
  });
}

load();

function addElement({ name, url }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () =>
    removeElement(
      trash.parentElement.children[0].textContent,
      trash.parentElement.children[0].href,
      trash
    );

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(name,url, el) {
  if (confirm("Tem certeza que deseja deletar?")){
    el.parentNode.remove();
  }
  fetch(
    `https://jaovitm-logindb.herokuapp.com/?name=${name}&url=${url}&del=1`
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert("Preencha o campo");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  addElement({ name, url });

  fetch(`https://jaovitm-logindb.herokuapp.com/?name=${name}&url=${url}/`);

  input.value = "";
});
