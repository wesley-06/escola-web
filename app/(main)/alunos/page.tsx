import { api } from "@/lib/axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

export default function Alunos() {
    const [alunos, setAlunos] = useState([])

    useEffect(async () => {
        const resposta = await api.get('alunos')
        setAlunos(resposta.data)
    },[api])

    return (
        <DataTable emptyMessage="Nenhum aluno encontrado"
        value={alunos}>
            <Column header="Matricula" field="matricula"></Column>
            <Column header="Nome" field="nome"></Column>
            <Column header="Data Nascimento" field="dataNasc"></Column>
            <Column header="E-mail" field="email"></Column>
        </DataTable>
    )
}