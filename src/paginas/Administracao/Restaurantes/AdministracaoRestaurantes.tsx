import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
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

const AdministracaoRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	useEffect(() => {
		axiosBaseURL
			.get("restaurantes/")
			.then(resposta => setRestaurantes(resposta.data));
	}, []);

	const excluirRestaurante = (restauranteAExcluir: IRestaurante) => {
		axiosBaseURL.delete(`restaurantes/${restauranteAExcluir.id}/`).then(() => {
			const listaRestaurante = restaurantes.filter(
				restaurante => restaurante.id !== restauranteAExcluir.id
			);
			setRestaurantes([...listaRestaurante]);
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
					{restaurantes.map(restaurante => (
						<TableRow key={restaurante.id}>
							<TableCell>{restaurante.nome}</TableCell>
							<TableCell>
								[
								<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>
								]
							</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									color="error"
									onClick={() => excluirRestaurante(restaurante)}
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

export default AdministracaoRestaurantes;
