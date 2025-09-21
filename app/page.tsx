"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Download, Printer, FileText, BarChart3 } from "lucide-react"

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

interface Answer {
  response: "sim" | "nao" | null
  justification: string
  textResponse: string
}

export default function GEMEvaluation() {
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map(() => ({ response: null, justification: "", textResponse: "" })),
  )
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleAnswerChange = (index: number, response: "sim" | "nao") => {
    const newAnswers = [...answers]
    newAnswers[index] = { ...newAnswers[index], response }
    if (response === "sim") {
      newAnswers[index].justification = ""
    }
    setAnswers(newAnswers)
  }

  const handleJustificationChange = (index: number, justification: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = { ...newAnswers[index], justification }
    setAnswers(newAnswers)
  }

  const handleTextResponseChange = (index: number, textResponse: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = { ...newAnswers[index], textResponse }
    setAnswers(newAnswers)
  }

  const getStats = () => {
    const yesNoQuestions = questions.filter((q) => q.type === "yesno")
    const textQuestions = questions.filter((q) => q.type === "text")

    const answeredYesNo = answers.filter((a, index) => questions[index].type === "yesno" && a.response !== null)
    const answeredText = answers.filter((a, index) => questions[index].type === "text" && a.textResponse.trim() !== "")

    const simCount = answers.filter((a, index) => questions[index].type === "yesno" && a.response === "sim").length
    const naoCount = answers.filter((a, index) => questions[index].type === "yesno" && a.response === "nao").length
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

  const stats = getStats()
  const chartData = [
    { name: "Sim", value: stats.sim, color: "#22c55e" },
    { name: "Não", value: stats.nao, color: "#ef4444" },
  ]

  const canShowResults = stats.totalAnswered === questions.length

  const generatePDF = async () => {
    // Simulated PDF generation - in a real app you'd use jsPDF + html2canvas
    const content = `
AVALIAÇÃO GEM - GRUPO DE ESTUDO MUSICAL

ESTATÍSTICAS:
- Total de respostas: ${stats.totalAnswered}/${questions.length}
- Perguntas Sim/Não respondidas: ${stats.sim + stats.nao}/${stats.totalYesNo}
- Perguntas de texto respondidas: ${stats.textAnswered}/${stats.totalText}
- Respostas "Sim": ${stats.sim} (${stats.simPercentage}%)
- Respostas "Não": ${stats.nao} (${stats.naoPercentage}%)

RESPOSTAS DETALHADAS:
${questions
        .map(
          (question, index) => `
${index + 1}. ${question.text}
${question.type === "yesno"
              ? `Resposta: ${answers[index].response ? (answers[index].response === "sim" ? "SIM" : "NÃO") : "Não respondida"}
${answers[index].justification ? `Justificativa: ${answers[index].justification}` : ""}`
              : `Resposta: ${answers[index].textResponse || "Não respondida"}`
            }
`,
        )
        .join("\n")}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "avaliacao-gem.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Avaliação GEM</h1>
          <p className="text-lg text-gray-600">Grupo de Estudo Musical - Formulário de Avaliação</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progresso: {stats.totalAnswered}/{questions.length} perguntas
              </span>
              <span className="text-sm text-gray-500">{stats.progress}%</span>
            </div>
            <Progress value={stats.progress} className="h-2" />
          </CardContent>
        </Card>

        {!showResults ? (
          <>
            {/* Questions */}
            <div className="space-y-6 mb-8">
              {questions.map((question, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {index + 1}. {question.text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {question.type === "yesno" ? (
                      <>
                        <RadioGroup
                          value={answers[index].response || ""}
                          onValueChange={(value) => handleAnswerChange(index, value as "sim" | "nao")}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id={`sim-${index}`} />
                            <Label htmlFor={`sim-${index}`} className="text-green-700 font-medium">
                              Sim
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id={`nao-${index}`} />
                            <Label htmlFor={`nao-${index}`} className="text-red-700 font-medium">
                              Não
                            </Label>
                          </div>
                        </RadioGroup>

                        {answers[index].response === "nao" && (
                          <div className="mt-4">
                            <Label htmlFor={`justification-${index}`} className="text-sm font-medium text-gray-700">
                              Justificativa (obrigatória para resposta "Não"):
                            </Label>
                            <Textarea
                              id={`justification-${index}`}
                              placeholder="Digite aqui a justificativa para a resposta 'Não'..."
                              value={answers[index].justification}
                              onChange={(e) => handleJustificationChange(index, e.target.value)}
                              className="mt-2"
                              rows={3}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        <Label htmlFor={`text-${index}`} className="text-sm font-medium text-gray-700">
                          Resposta:
                        </Label>
                        <Textarea
                          id={`text-${index}`}
                          placeholder="Digite sua resposta aqui..."
                          value={answers[index].textResponse}
                          onChange={(e) => handleTextResponseChange(index, e.target.value)}
                          className="mt-2"
                          rows={4}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button onClick={() => setShowResults(true)} disabled={!canShowResults} size="lg" className="px-8 py-3">
                <BarChart3 className="mr-2 h-5 w-5" />
                Ver Resultados e Estatísticas
              </Button>
              {!canShowResults && (
                <p className="text-sm text-gray-500 mt-2">Responda todas as perguntas para ver os resultados</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">{stats.sim}</div>
                    <div className="text-sm text-gray-600">Respostas "Sim"</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">{stats.nao}</div>
                    <div className="text-sm text-gray-600">Respostas "Não"</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stats.textAnswered}</div>
                    <div className="text-sm text-gray-600">Respostas de Texto</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalAnswered}</div>
                    <div className="text-sm text-gray-600">Total Respondidas</div>
                  </CardContent>
                </Card>
              </div>

              {stats.sim + stats.nao > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Distribuição das Respostas Sim/Não</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Detailed Answers */}
              <Card>
                <CardHeader>
                  <CardTitle>Respostas Detalhadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {index + 1}. {question.text}
                        </h4>
                        {question.type === "yesno" ? (
                          <>
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-sm font-medium">Resposta:</span>
                              <span
                                className={`px-2 py-1 rounded text-sm font-medium ${answers[index].response === "sim"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {answers[index].response === "sim" ? "SIM" : "NÃO"}
                              </span>
                            </div>
                            {answers[index].justification && (
                              <div className="mt-2">
                                <span className="text-sm font-medium text-gray-700">Justificativa:</span>
                                <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                                  {answers[index].justification}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="mt-2">
                            <span className="text-sm font-medium text-gray-700">Resposta:</span>
                            <p className="text-sm text-gray-600 mt-1 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                              {answers[index].textResponse || "Não respondida"}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button onClick={generatePDF} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Baixar Relatório
              </Button>
              <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
              <Button onClick={() => setShowResults(false)} variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Voltar ao Formulário
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
