/****************************************************************
 * Autor: Nathan Ferraz da Silva
 * Inicio: 09/01/2022
 * Ultima alteracao: 11/01/2022
 * Nome: script.js
 * Funcao: Contem todas as variaveis e metodos para executar o
 * index.html
 * ************************************************************** */

var scenes = ["Tie-Fighter atacando","Canhão de Plasma atacando","Corredor livre","Ponto fraco à frente"]
var currentSceneIndex
var life
var turn

var buttonAble = false

var lblLife = document.getElementById('lbl_vida')
var lblTurn = document.getElementById('lbl_turno')
var lblScene = document.getElementById('lbl_cenario')

var actionButtons = document.getElementsByClassName('btnsDeAcao')
var btnPlay = document.getElementById('btn_play')

var imgXwing = document.getElementById('nave')
var txtLog = document.getElementById('log')


/* ================================================
        FUNCOES DE ALTERACAO DA INTERFACE
/* ================================================

/**
 * Habilita/Desabilita os botoes de acao para que nao sejam ativados num momento errado
 */
 function switchActionButtons(){
  for (let index = 0; index < actionButtons.length; index++) {
    actionButtons[index].disabled = buttonAble
  }
  buttonAble = !buttonAble
  document.getElementById("btnPlay").classList.toggle("hide");
}

/**
 * Atualiza as informacoes do HUD
 */
 function updateHud(){
  lblTurn.innerText = "Turno: " + turn
  lblLife.innerText = "Vidas: " + life
  lblScene.innerText = scenes[currentSceneIndex] 
}

/* ================================================
             FUNCOES DE ESTADO DO JOGO
/* ================================================

/**
 * Inicializa o jogo
 */
function startGame(){
  txtLog.innerText = "O Jogo começou!!!"
  switchActionButtons()

  life = 3
  turn = 0
  changeScene ()

}

/**
 * Finaliza o jogo
 * @param {Boolean} win Derrotou a Death Star ? 
 */
function finishGame(win){
  turn++
  updateHud()
  switchActionButtons()

  if(win){
    lblScene.innerText = "VOCÊ GANHOU !!!"
    txtLog.innerHTML += " <br> Você ganhou"
    txtLog.innerHTML += " <br> Vidas: " + life
    txtLog.innerHTML += " <br> Turnos: " + turn
  }else{
    lblScene.innerText = "VOCE PERDEU !!!"
    txtLog.innerHTML += " <br> A X-Wing recebeu danos demais"
  }

  btnPlay.innerText = "Jogar Novamente"
  imgXwing.style.animation = 'none'
}

/**
 * Troca o cenario do jogo
 */
 function changeScene (){
  currentSceneIndex = Math.floor(Math.random() * 4)
  turn++
  updateHud()
  txtLog.innerHTML += " <br> " + scenes[currentSceneIndex]
}

/**
* Computa o dano na Xwing
*/
function takeDamage(){
  txtLog.innerHTML += " <br> Nave danificada"
  life--
  if(life<=0)
    finishGame(false)
  else
    changeScene ()
}

/* ================================================
              FUNCOES DE ACAO DA X WING
/* ================================================

/**
 * Executa o ato de atirar da X-Wing
 */
 function atirar(){
  txtLog.innerHTML += " <br> X-Wing atira" 
  if(imgXwing.style.animationName == 'atack')
    imgXwing.style.animationName = 'atack2'
  else
    imgXwing.style.animationName = 'atack'

  imgXwing.style.animationDuration = '5s'
  imgXwing.style.animationIterationCount = '1'
  imgXwing.style.animationDirection = 'normal'

  switch(currentSceneIndex){
    case 1:
      changeScene ()
      break
    case 3:
      finishGame(true)
      break
    default:
      takeDamage(0) 
  }
}

/**
 * Executa o ato de acelerar da X-Wing
 */
function acelerar(){
  txtLog.innerHTML += " <br> X-Wing acelera"
  imgXwing.style.animationName = 'acelerar'
  imgXwing.style.animationDuration = '2s'
  imgXwing.style.animationIterationCount = 'infinite'
  imgXwing.style.animationDirection = 'alternate'

  switch(currentSceneIndex){
    case 2:
      changeScene ()
      break
    default:
      takeDamage(1)
  }
}

/**
 * Executa o ato de desvio da X-Wing
 */
function desviar(){
  // Animacao de Desvio
  txtLog.innerHTML += " <br> X-Wing desvia"
  imgXwing.style.animationName = 'desviar'
  imgXwing.style.animationDuration = '3s'
  imgXwing.style.animationIterationCount = 'infinite'
  imgXwing.style.animationDirection = 'normal'

  // Seleciona o que deve ser feito ao desviar
  switch(currentSceneIndex){
    case 0:
      changeScene ()
      break
    default:
      takeDamage(2)
  }
}





