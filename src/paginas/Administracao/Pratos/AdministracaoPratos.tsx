import { useEffect, useState } from "react";
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosBaseURL from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
	const [pratos, setPratos] = useState<IPrato[]>([]);
	useEffect(() => {
		axiosBaseURL.get("pratos/").then(resposta => setPratos(resposta.data));
	}, []);

	const excluirPrato = (pratoAExcluir: IPrato) => {
		axiosBaseURL.delete(`pratos/${pratoAExcluir.id}/`).then(() => {
			const listaPrato = pratos.filter(prato => prato.id !== pratoAExcluir.id);
			setPratos([...listaPrato]);
		});
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell>Editar</TableCell>
						<TableCell>Excluir</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pratos.map(prato => (
						<TableRow key={prato.id}>
							<TableCell>{prato.nome}</TableCell>
							<TableCell>
								[<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
							</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									color="error"
									onClick={() => excluirPrato(prato)}
								>
									Excluir
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default AdministracaoPratos;
