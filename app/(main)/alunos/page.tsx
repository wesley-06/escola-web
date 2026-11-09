import { api } from "@/lib/axios";
import { alunoService } from "@/services/alunoService";
import { alunoComRelacoes } from "@/types/escola";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";



export default function Alunos() {
    const [alunos, setAlunos] = useState<alunoComRelacoes[]>([])

    useEffect(() => {
        async function buscarAlunos() {
            const alunoApi = await alunoService.listar()
            setAlunos(alunoApi)
        }

        buscarAlunos()
    }, [])
}   
                
        

return (
        <DataTable
            emptyMessage="Nenhum aluno encontrado"
            value={alunos}>
            <Column header="Matricula" field="matricula"></Column>
            <Column header="Nome" field="nome"></Column>
            <Column header="Data Nascimento" field="dataNasc"
            body={(aluno) => new Date(aluno.nascimento)
                    .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            ></Column>    
            <Column header="E-mail" field="email"></Column>
        </DataTable>
    )
}