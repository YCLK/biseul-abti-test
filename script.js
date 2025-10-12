const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.animation = "fadeOut 0.3s";
  setTimeout(() => {
    result.style.animation = "fadeIn 0.3s";
    setTimeout(() => {
      qna.classList.add("hidden");
      result.classList.remove("hidden");
    }, 140)})

    setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add(
    'answerList',
    'fadeIn',
    'w-full',
    'rounded-lg',
    'border-2',
    'border-gray-200',
    'bg-white',
    'px-6',
    'py-4',
    'text-left',
    'transition',
    'hover:border-blue-600',
    'hover:bg-blue-50',
    'focus:border-blue-600',
    'focus:bg-blue-50'
  );
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.animation = "fadeOut 0.3s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }

      for(let i = 0; i < children.length; i++){
        children[i].classList.add("hidden");
      }
      goNext(++qIdx);
    }, 140)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.animation = "fadeOut 0.3s";
  setTimeout(() => {
    qna.style.animation = "fadeIn 0.3s";
    setTimeout(() => {
      main.classList.add("hidden");
      qna.classList.remove("hidden");
    }, 140)
    let qIdx = 0;
    goNext(qIdx);
  }, 140);
}