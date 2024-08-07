import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import axiosBaseURL from "../../../http";

const FormularioRestaurante = () => {
	const parametros = useParams();

	useEffect(() => {
		if (parametros.id) {
			axiosBaseURL
				.get<IRestaurante>(`restaurantes/${parametros.id}/`)
				.then(resposta => setNomeRestaurante(resposta.data.nome));
		}
	}, [parametros]);

	const [nomeRestaurante, setNomeRestaurante] = useState("");

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

		if (parametros.id) {
			axiosBaseURL
				.put(`restaurantes/${parametros.id}/`, {
					nome: nomeRestaurante,
				})
				.then(() => {
					alert("Restaurante atualizado com sucesso");
				});
		} else {
			axiosBaseURL
				.post("restaurantes/", {
					nome: nomeRestaurante,
				})
				.then(() => {
					alert("Restaurante cadastrado com sucesso");
				});
		}
	};

	return (
		<Box>
			<Container maxWidth="lg" sx={{ mt: 1 }}>
				<Paper sx={{ p: 2 }}>
					{/* conteudo da página */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							flexGrow: 1,
						}}
					>
						<Box
							component="form"
							sx={{ width: "100%" }}
							onSubmit={aoSubmeterForm}
						>
							<Typography component="h1" variant="h6">
								Formulário de Restaurantes
							</Typography>
							<TextField
								value={nomeRestaurante}
								onChange={evento => setNomeRestaurante(evento.target.value)}
								id="standard-basic"
								label="Nome do Restaurante"
								variant="standard"
								fullWidth
								required
							/>
							<Button
								sx={{ marginTop: 1 }}
								type="submit"
								fullWidth
								variant="outlined"
							>
								Salvar
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default FormularioRestaurante;
