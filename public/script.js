// Dados das perguntas
const questions = [
  {
    text: "O Encarregado de Orquestra deixou instrutores responsáveis pela atualização no Sistema de Administração Musical? A sugestão é de que sejam pelo menos dois irmãos instrutores.",
    type: "yesno",
  },
  {
    text: "Com qual periodicidade são realizadas as inclusões, alterações e exclusões quando necessárias no Sistema de Administração Musical? A sugestão é de realizar uma vez por mês, devido a rotatividade no GEM, inclusive organistas.",
    type: "text",
  },
  {
    text: "A quantidade de músicos, organistas, candidatos e candidatas estão atualizados no Sistema de Administração Musical? (quantidade real é igual ao relatório do Sistema)",
    type: "yesno",
  },
  {
    text: "Os músicos, organistas, candidatos (as) estão com NÍVEL correto no Sistema de Administração Musical? (Ensaio / RJM / Culto Oficial / Oficialização)",
    type: "yesno",
  },
  {
    text: "A casa de oração possui os formulários cadastrais, formulários de candidatos (as) de outras comuns congregações e instruções em conformidade?",
    type: "yesno",
  },
  {
    text: "Nos formulários, há assinatura do Ministério (Ancião, Cooperador e Encarregado de Orquestra)? A orientação é de que sempre que um candidato (a) for ingressar deverá ser colhida a assinatura do Ministério e apresentação formal do candidato (a) ao Ancião e Cooperador pelo Encarregado de Orquestra, no mesmo instante.",
    type: "yesno",
  },
  {
    text: "A quantidade de instrutores que participa do GEM está igual ao que consta no Sistema de Administração Musical?",
    type: "yesno",
  },
  {
    text: "Segundo o Manual de Orientação Orquestral (MOO), é realizado um trabalho de orientação aos candidatos sobre o Equilíbrio Orquestral no GEM? O objetivo é que os candidatos optem por instrumentos que estão em falta na Casa de Oração.",
    type: "yesno",
  },
  {
    text: "Como está o Equilíbrio Orquestral atual da casa de oração no GEM e projeção futura? Quais os instrumentos faltantes e os instrumentos que estão em excesso?",
    type: "text",
  },
  {
    text: "De que forma a Administração Musical pode auxiliar na busca do Equilíbrio Orquestral da casa de oração? Exemplo: Identificar em outros GEM's, instrutores de instrumentos que a casa de oração não possui, mas que existe demanda.",
    type: "text",
  },
  {
    text: "O GEM possui Ensaio para candidatos (as)? Se não, existe possibilidade de ser instituído? Quando? Se houver poucos candidatos, é viável fazer o Ensaio de Candidatos (as) em conjunto com outra casa de oração próxima?",
    type: "text",
  },
  {
    text: "Em havendo Ensaio de candidatos (as), qual é dinâmica do Ensaio, existe aderência ao MSA e as instruções da Comissão Musical Brás SP?",
    type: "text",
  },
  {
    text: "No GEM é realizado aula em conjunto sobre o MSA (Método Simplificado de Aprendizagem Musical)? Se não, é possível iniciar? Precisa de apoio da Administração Musical?",
    type: "text",
  },
  {
    text: "No GEM, os candidatos estudam a leitura rítmica e métrica? Conforme o MSA. Existe necessidade de apoio técnico aos instrutores sobre este tema?",
    type: "text",
  },
  {
    text: "É utilizado o Programa Mínimo 2023 para verificar quando o candidato irá participar da RJM, Culto Oficial e Oficialização?",
    type: "yesno",
  },
  {
    text: "Quem são os irmãos responsáveis pelo livro de voluntários do GEM? Está sendo preenchido e assinado pelos instrutores a cada GEM?",
    type: "text",
  },
  {
    text: "Qual o estado atual do órgão?",
    type: "text",
  },
  {
    text: "Qual foi a última vez que foi realizada manutenção preventiva no órgão. Qual marca e modelo? Se possível tirar fotos do órgão, inclusive onde está descrito marca e modelo.",
    type: "text",
  },
  {
    text: "Qual o estado atual das estantes de músicos (fixas e reservas)? A quantidade atual atende a necessidade da Casa de Oração?",
    type: "text",
  },
  {
    text: "A casa de oração possui suporte / ganchos em quantidade suficiente para pendurar os instrumentos musicais? Estão bem conservados?",
    type: "text",
  },
  {
    text: "O Encarregado de Orquestra e instrutores conhecem como funciona o Fundo Musical? Informar o conceito, critérios e fluxo para possível doação de instrumentos.",
    type: "text",
  },
]

// Gerenciamento de estado
const answers = questions.map(() => ({ response: null, justification: "", textResponse: "" }))

// Elementos do DOM
const initialPage = document.getElementById("initial-page")
const informationPage = document.getElementById("information-page")
const formSection = document.getElementById("form-section")
const questionsContainer = document.getElementById("questions-container")
const showResultsBtn = document.getElementById("show-results-btn")
const submitMessage = document.getElementById("submit-message")
const resultsSection = document.getElementById("results-section")
const gemForm = document.getElementById("gem-form")
const inspectorInput = document.getElementById("inspector-name")
const congregationInput = document.getElementById("congregation-name")
const proceedToFormBtn = document.getElementById("proceed-to-form-btn")
const initialMessage = document.getElementById("initial-message")
const resetFormBtn = document.getElementById("reset-form-btn")
const loadingScreen = document.getElementById("loading-screen")

// Inicializar a aplicação
function init() {
  setupInitialPageListeners()
  renderQuestions()
  setupEventListeners()
  updateProgress()
}

// Configurar listeners da página inicial
function setupInitialPageListeners() {
  inspectorInput.addEventListener("input", updateInitialPageState)
  congregationInput.addEventListener("input", updateInitialPageState)
  // Removido o event listener do botão de prosseguir da página inicial
}

// Atualizar estado da página inicial
function updateInitialPageState() {
  const inspectorName = inspectorInput.value.trim()
  const congregationName = congregationInput.value.trim()

  const canStart = inspectorName !== "" && congregationName !== ""

  // Mostrar automaticamente a página de informações quando ambos os campos estiverem preenchidos
  if (canStart) {
    initialMessage.style.display = "none"
    // Mostrar página de informações automaticamente
    initialPage.classList.add("hidden")
    informationPage.classList.remove("hidden")
    window.scrollTo(0, 0)
  } else {
    initialMessage.style.display = "block"
    initialMessage.textContent = "Preencha todos os campos para prosseguir"
    // Esconder página de informações se os campos não estiverem completos
    informationPage.classList.add("hidden")
    initialPage.classList.remove("hidden")
  }
}

// Prosseguir para o formulário da página de informações
function proceedToForm() {
  const inspectorName = inspectorInput.value.trim()
  const congregationName = congregationInput.value.trim()

  if (!inspectorName || !congregationName) {
    alert("Por favor, preencha seu nome e o nome da congregação antes de prosseguir para o formulário.")
    return
  }

  showLoadingAnimation(() => {
    informationPage.classList.add("hidden")
    formSection.classList.remove("hidden")
    formSection.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

// Renderizar todas as perguntas
function renderQuestions() {
  questionsContainer.innerHTML = ""

  questions.forEach((question, index) => {
    const questionCard = document.createElement("div")
    questionCard.className = "question-card"

    if (question.type === "yesno") {
      questionCard.innerHTML = `
                <h3 class="question-title">${index + 1}. ${question.text}</h3>
                <div class="radio-group">
                    <div class="radio-option sim">
                        <input type="radio" id="sim-${index}" name="question-${index}" value="sim">
                        <label for="sim-${index}">Sim</label>
                    </div>
                    <div class="radio-option nao">
                        <input type="radio" id="nao-${index}" name="question-${index}" value="nao">
                        <label for="nao-${index}">Não</label>
                    </div>
                </div>
                <div class="textarea-container" id="justification-${index}" style="display: none;">
                    <label for="justification-text-${index}">Justificativa (obrigatória para resposta "Não"):</label>
                    <textarea id="justification-text-${index}" placeholder="Digite aqui a justificativa para a resposta 'Não'..." rows="3"></textarea>
                </div>
            `
    } else {
      questionCard.innerHTML = `
                <h3 class="question-title">${index + 1}. ${question.text}</h3>
                <div class="textarea-container">
                    <label for="text-${index}">Resposta:</label>
                    <textarea id="text-${index}" placeholder="Digite sua resposta aqui..." rows="4"></textarea>
                </div>
            `
    }

    questionsContainer.appendChild(questionCard)
  })
}

// Configurar event listeners
function setupEventListeners() {
  // Listeners dos botões de rádio
  questions.forEach((question, index) => {
    if (question.type === "yesno") {
      const simRadio = document.getElementById(`sim-${index}`)
      const naoRadio = document.getElementById(`nao-${index}`)
      const justificationContainer = document.getElementById(`justification-${index}`)
      const justificationText = document.getElementById(`justification-text-${index}`)

      simRadio.addEventListener("change", () => {
        if (simRadio.checked) {
          answers[index].response = "sim"
          answers[index].justification = ""
          justificationContainer.style.display = "none"
          justificationText.value = ""
          updateProgress()
        }
      })

      naoRadio.addEventListener("change", () => {
        if (naoRadio.checked) {
          answers[index].response = "nao"
          justificationContainer.style.display = "block"
          updateProgress()
        }
      })

      justificationText.addEventListener("input", (e) => {
        answers[index].justification = e.target.value
        updateProgress()
      })
    } else {
      const textArea = document.getElementById(`text-${index}`)
      textArea.addEventListener("input", (e) => {
        answers[index].textResponse = e.target.value
        updateProgress()
      })
    }
  })

  // Listeners dos botões
  showResultsBtn.addEventListener("click", showResults)
  document.getElementById("download-pdf-btn").addEventListener("click", generatePDF)
  document.getElementById("print-btn").addEventListener("click", () => window.print())
  document.getElementById("back-to-form-btn").addEventListener("click", backToForm)
  resetFormBtn.addEventListener("click", resetForm)
  proceedToFormBtn.addEventListener("click", proceedToForm)
}

// Atualizar barra de progresso e estado do botão
function updateProgress() {
  const stats = getStats()
  const congregationName = congregationInput.value.trim()

  // Update progress bar
  document.getElementById("progress-text").textContent =
    `Progresso: ${stats.totalAnswered}/${questions.length} perguntas`
  document.getElementById("progress-percentage").textContent = `${stats.progress}%`
  document.getElementById("progress-fill").style.width = `${stats.progress}%`

  const canShowResults = stats.totalAnswered === questions.length && congregationName !== ""
  showResultsBtn.disabled = !canShowResults

  if (!congregationName) {
    submitMessage.textContent = "Preencha o nome da congregação e responda todas as perguntas para ver os resultados"
  } else if (stats.totalAnswered < questions.length) {
    submitMessage.textContent = "Responda todas as perguntas para ver os resultados"
  } else {
    submitMessage.textContent = ""
  }

  submitMessage.style.display = canShowResults ? "none" : "block"
}

// Calcular estatísticas
function getStats() {
  const yesNoQuestions = questions.filter((q) => q.type === "yesno")
  const textQuestions = questions.filter((q) => q.type === "text")

  const answeredYesNo = answers.filter(
    (a, index) =>
      questions[index].type === "yesno" &&
      a.response !== null &&
      (a.response === "sim" || (a.response === "nao" && a.justification.trim() !== "")),
  )

  const answeredText = answers.filter((a, index) => questions[index].type === "text" && a.textResponse.trim() !== "")

  const simCount = answers.filter((a, index) => questions[index].type === "yesno" && a.response === "sim").length

  const naoCount = answers.filter(
    (a, index) => questions[index].type === "yesno" && a.response === "nao" && a.justification.trim() !== "",
  ).length

  const totalAnswered = answeredYesNo.length + answeredText.length

  return {
    sim: simCount,
    nao: naoCount,
    textAnswered: answeredText.length,
    totalYesNo: yesNoQuestions.length,
    totalText: textQuestions.length,
    totalAnswered,
    total: questions.length,
    simPercentage: answeredYesNo.length > 0 ? Math.round((simCount / answeredYesNo.length) * 100) : 0,
    naoPercentage: answeredYesNo.length > 0 ? Math.round((naoCount / answeredYesNo.length) * 100) : 0,
    progress: Math.round((totalAnswered / questions.length) * 100),
  }
}

// Mostrar seção de resultados
function showResults() {
  showLoadingAnimation(() => {
    const stats = getStats()
    const congregationName = congregationInput.value.trim()
    const inspectorName = inspectorInput.value.trim()

    // Esconder formulário e mostrar resultados
    formSection.classList.add("hidden")
    resultsSection.classList.remove("hidden")

    document.getElementById("results-congregation-name").textContent = `Avaliação GEM - ${congregationName}`
    document.getElementById("results-inspector-name").textContent = `Responsável pela Vistoria: ${inspectorName}`

    // Update statistics with percentages
    const totalResponses = stats.sim + stats.nao + stats.textAnswered

    document.getElementById("stat-sim").textContent = stats.sim
    document.getElementById("stat-nao").textContent = stats.nao
    document.getElementById("stat-text").textContent = stats.textAnswered
    document.getElementById("stat-total").textContent = stats.totalAnswered

    // Calculate and display percentages
    if (totalResponses > 0) {
      document.getElementById("stat-sim-percentage").textContent = `${Math.round((stats.sim / totalResponses) * 100)}%`
      document.getElementById("stat-nao-percentage").textContent = `${Math.round((stats.nao / totalResponses) * 100)}%`
      document.getElementById("stat-text-percentage").textContent =
        `${Math.round((stats.textAnswered / totalResponses) * 100)}%`
    } else {
      document.getElementById("stat-sim-percentage").textContent = "0%"
      document.getElementById("stat-nao-percentage").textContent = "0%"
      document.getElementById("stat-text-percentage").textContent = "0%"
    }

    // Generate detailed answers
    generateDetailedAnswers()

    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

// Gerar respostas detalhadas
function generateDetailedAnswers() {
  const container = document.getElementById("detailed-answers-content")
  container.innerHTML = ""

  questions.forEach((question, index) => {
    const answerItem = document.createElement("div")
    answerItem.className = "answer-item"

    let answerContent = ""

    if (question.type === "yesno") {
      const response = answers[index].response
      const justification = answers[index].justification

      answerContent = `
                <div class="answer-question">${index + 1}. ${question.text}</div>
                <div class="answer-response">
                    <span>Resposta:</span>
                    <span class="answer-badge ${response}">${response ? (response === "sim" ? "SIM" : "NÃO") : "Não respondida"}</span>
                </div>
                ${
                  justification
                    ? `
                    <div class="answer-justification">
                        <label>Justificativa:</label>
                        <p>${justification}</p>
                    </div>
                `
                    : ""
                }
            `
    } else {
      const textResponse = answers[index].textResponse

      answerContent = `
                <div class="answer-question">${index + 1}. ${question.text}</div>
                <div class="answer-text">
                    <label>Resposta:</label>
                    <p>${textResponse || "Não respondida"}</p>
                </div>
            `
    }

    answerItem.innerHTML = answerContent
    container.appendChild(answerItem)
  })
}

// Gerar relatório PDF
async function generatePDF() {
  showLoadingAnimation(async () => {
    try {
      const { jsPDF } = window.jspdf
      const pdf = new jsPDF()

      const congregationName = congregationInput.value.trim()
      const inspectorName = inspectorInput.value.trim()

      // Adicionar título
      pdf.setFontSize(20)
      pdf.setFont(undefined, "bold")
      pdf.text("AVALIAÇÃO GEM", 105, 30, { align: "center" })
      pdf.setFontSize(16)
      pdf.setFont(undefined, "normal")
      pdf.text("Grupo de Educação Musical", 105, 40, { align: "center" })

      pdf.setFontSize(14)
      pdf.setFont(undefined, "bold")
      pdf.text(`Congregação: ${congregationName}`, 105, 50, { align: "center" })
      pdf.text(`Responsável: ${inspectorName}`, 105, 60, { align: "center" })

      // Adicionar data
      const currentDate = new Date().toLocaleDateString("pt-BR")
      pdf.setFontSize(12)
      pdf.setFont(undefined, "normal")
      pdf.text(`Data: ${currentDate}`, 20, 75)

      // Adicionar estatísticas
      const stats = getStats()

      pdf.setFontSize(14)
      pdf.setFont(undefined, "bold")
      pdf.text("ESTATÍSTICAS:", 20, 90)
      pdf.setFontSize(12)
      pdf.setFont(undefined, "normal")
      pdf.text(`Total de respostas: ${stats.totalAnswered}/${questions.length}`, 20, 105)
      pdf.text(`Perguntas Sim/Não respondidas: ${stats.sim + stats.nao}/${stats.totalYesNo}`, 20, 115)
      pdf.text(`Perguntas de texto respondidas: ${stats.textAnswered}/${stats.totalText}`, 20, 125)

      if (stats.totalAnswered > 0) {
        pdf.text(`Respostas "Sim": ${stats.sim} (${stats.simPercentage}%)`, 20, 135)
        pdf.text(`Respostas "Não": ${stats.nao} (${stats.naoPercentage}%)`, 20, 145)
        pdf.text(
          `Respostas de Texto: ${stats.textAnswered} (${Math.round((stats.textAnswered / stats.totalAnswered) * 100)}%)`,
          20,
          155,
        )
      }

      // Adicionar respostas detalhadas
      pdf.setFontSize(14)
      pdf.setFont(undefined, "bold")
      pdf.text("RESPOSTAS DETALHADAS:", 20, 175)

      let yPosition = 190
      pdf.setFontSize(10)
      pdf.setFont(undefined, "normal")

      questions.forEach((question, index) => {
        // Verificar se precisamos de uma nova página
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }

        // Pergunta
        const questionText = `${index + 1}. ${question.text}`
        const questionLines = pdf.splitTextToSize(questionText, 170)
        pdf.setFont(undefined, "bold")
        pdf.text(questionLines, 20, yPosition)
        yPosition += questionLines.length * 5 + 5
        pdf.setFont(undefined, "normal")

        // Resposta
        if (question.type === "yesno") {
          const response = answers[index].response
          pdf.text(`Resposta: ${response ? (response === "sim" ? "SIM" : "NÃO") : "Não respondida"}`, 20, yPosition)
          yPosition += 10

          if (answers[index].justification) {
            const justificationLines = pdf.splitTextToSize(`Justificativa: ${answers[index].justification}`, 170)
            pdf.text(justificationLines, 20, yPosition)
            yPosition += justificationLines.length * 5
          }
        } else {
          const textResponse = answers[index].textResponse || "Não respondida"
          const responseLines = pdf.splitTextToSize(`Resposta: ${textResponse}`, 170)
          pdf.text(responseLines, 20, yPosition)
          yPosition += responseLines.length * 5
        }

        yPosition += 10 // Espaço entre perguntas
      })

      // Salvar o PDF
      pdf.save("relatorio-avaliacao-gem.pdf")
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      alert("Erro ao gerar PDF. Tente novamente.")
    }
  })
}

// Voltar para o formulário
function backToForm() {
  resultsSection.classList.add("hidden")
  formSection.classList.remove("hidden")
  window.scrollTo(0, 0)
}

// Função de resetar formulário para limpar todos os dados e retornar à página inicial
function resetForm() {
  // Mostrar diálogo de confirmação
  if (confirm("Tem certeza que deseja resetar o formulário? Todos os dados preenchidos serão perdidos.")) {
    showLoadingAnimation(() => {
      // Limpar todas as respostas
      answers.forEach((answer, index) => {
        answers[index] = { response: null, justification: "", textResponse: "" }
      })

      // Limpar campos de entrada
      inspectorInput.value = ""
      congregationInput.value = ""

      // Limpar todas as entradas do formulário
      questions.forEach((question, index) => {
        if (question.type === "yesno") {
          const simRadio = document.getElementById(`sim-${index}`)
          const naoRadio = document.getElementById(`nao-${index}`)
          const justificationText = document.getElementById(`justification-text-${index}`)
          const justificationContainer = document.getElementById(`justification-${index}`)

          if (simRadio) simRadio.checked = false
          if (naoRadio) naoRadio.checked = false
          if (justificationText) justificationText.value = ""
          if (justificationContainer) justificationContainer.style.display = "none"
        } else {
          const textArea = document.getElementById(`text-${index}`)
          if (textArea) textArea.value = ""
        }
      })

      // Esconder todas as seções exceto a página inicial
      resultsSection.classList.add("hidden")
      formSection.classList.add("hidden")
      informationPage.classList.add("hidden")
      initialPage.classList.remove("hidden")

      // Atualizar progresso e estado da página inicial
      updateProgress()
      updateInitialPageState()

      // Rolar para o topo
      window.scrollTo(0, 0)
    })
  }
}

function showLoadingAnimation(callback) {
  const loadingScreen = document.getElementById("loading-screen")

  // Mostrar animação de carregamento
  loadingScreen.classList.add("show")

  // Após 2 segundos, esconder carregamento e executar callback
  setTimeout(() => {
    loadingScreen.classList.remove("show")
    if (callback) {
      callback()
    }
  }, 2000)
}

// Inicializar a aplicação quando o DOM for carregado
document.addEventListener("DOMContentLoaded", init)
