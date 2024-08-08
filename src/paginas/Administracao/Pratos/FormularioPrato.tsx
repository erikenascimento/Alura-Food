import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Paper,
} from "@mui/material";
import React, { useState } from "react";

const FormularioPrato = () => {
	const [nomePrato, setNomePrato] = useState("");

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
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
								Formulário de Pratos
							</Typography>
							<TextField
								value={nomePrato}
								onChange={evento => setNomePrato(evento.target.value)}
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

export default FormularioPrato;
