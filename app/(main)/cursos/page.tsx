import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function Cursos() {

    const cursos = [
        {matricula:'202601', nome:'Wesley Gomes', dataNasc:'2000-05-06',email:'wesley@email.com'},
        {matricula:'202602', nome:'Wesley Gomes', dataNasc:'2000-05-06',email:'wesley@email.com'},
        {matricula:'202603', nome:'Wesley Gomes', dataNasc:'2000-05-06',email:'wesley@email.com'},
    ]

    return (
        <DataTable emptyMessage="Nenhum aluno encontrado"
        value={cursos}>
            <Column header="Matricula" field="matricula"></Column>
            <Column header="Nome" field="nome"></Column>
            <Column header="Data Nascimento" field="dataNasc"></Column>
            <Column header="E-mail" field="email"></Column>
        </DataTable>
    )
}