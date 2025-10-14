import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
export default function Dashboard() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    //VARIÁVEIS DE ESTADO
    const [selectedDisciplina, setSelectedDisciplina] = useState<number | null>(null);
    const [nivel, setNivel] = useState<'Disciplina' | 'Assunto'>('Disciplina');

    
    //FORMATO DOS DADOS DO GRÁFICOS (DEVE VIR DA API ASSIM)
    const data = [
    {
        disciplina: 'Matemática',
        assuntos: [
            { nome: 'Algebra', acertos: 30, erros: 10 },
            { nome: 'Geometria', acertos: 20, erros: 20 },
        ],
    },
    {
        disciplina: 'Português',
        assuntos: [
            { nome: 'Gramática', acertos: 25, erros: 15 },
            { nome: 'Interpretação de Texto', acertos: 30, erros: 5 },
        ],
    },
    {
        disciplina: 'História',
        assuntos: [
            { nome: 'Brasil Colônia', acertos: 10, erros: 25 },
            { nome: 'Brasil Império', acertos: 15, erros: 20 },
        ],
    },
    ];

    //Labels para o Gráfico de Disciplina/Assunto 
    const chart1Labels = 
    nivel === 'Disciplina'
    ? data.map((d) => d.disciplina)
    : data[selectedDisciplina ?? 0]?.assuntos.map((a) => a.nome) || [];

    //Dados de valores para o Gráfico de Disciplina/Assunto
    const chart1Values =
    nivel === 'Disciplina'
    ? data.map((d) => d.assuntos.reduce((sum, a) => sum + a.acertos + a.erros, 0))
    : data[selectedDisciplina ?? 0]?.assuntos.map((a) => a.acertos + a.erros) || [];

    //Dados do Gráfico de Disciplina/Assunto
    const chart1Data = {
        labels: chart1Labels,
        datasets: [
            {
                data: chart1Values,
                label: nivel === 'Disciplina' ? 'Questões por Disciplina' : 'Questões por Assunto',
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            }
        ]
    }

    //Valores para o Gráfico de Acertos/Erros
    const chart2Values =
    nivel === 'Disciplina'
    ? (() => {
        const acertos = data.reduce((sum, d) => sum + d.assuntos.reduce((s, a) => s + a.acertos, 0), 0);
        const erros = data.reduce((sum, d) => sum + d.assuntos.reduce((s, a) => s + a.erros, 0), 0);
        return [acertos, erros];
    })()
    : (() => {
        const assuntos = data[selectedDisciplina ?? 0]?.assuntos || [];
        const acertos = assuntos.reduce((sum, a) => sum + a.acertos, 0);
        const erros = assuntos.reduce((sum, a) => sum + a.erros, 0);
        return [acertos, erros];
    })();
    console.log('valores2', chart2Values);
    //Dados do Gráfico de Acertos/Erros
    const chart2Data = {
        labels: ['Acertos', 'Erros'],
        datasets: [
            {
                data: chart2Values,
                backgroundColor: ['#008000', '#FF0000'],
            }
        ]
    }

    //Lógica para clicar no gráfico de Disciplina/Assunto
    const handleChart1Click = (_: any, elements: any) => {
        console.log('clicou', elements.type);
        if (!elements.length) return;
        const index = elements[0].index;
        console.log('teste3: ', chart2Values);
        if (nivel === 'Disciplina') {
            setSelectedDisciplina(index);
            setNivel('Assunto');
        }
    }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
        <div className="font-semibold">User</div>
        <div className="text-lg font-bold">Vestibular</div>
        <div className="w-20" /> {/* espaçamento p/ alinhar */}
      </nav>

      {/* Área dos gráficos */}
      <div className="flex flex-1 items-center justify-center gap-100">
        {/* Gráfico 1 */}
        <div className="w-96 h-96 bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
          <Doughnut
            data={chart1Data}
            options={
                {onClick: handleChart1Click}
            }
          />
        </div>

        {/* Gráfico 2 */}
        <div className="w-96 h-96 bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
          <Doughnut
            data={chart2Data}
          />
        </div>
      </div>
    </div>
  );
}
