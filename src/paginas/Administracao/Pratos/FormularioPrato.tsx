import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosBaseURL from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
	const [nomePrato, setNomePrato] = useState("");
	const [descricao, setDescricao] = useState("");

	const [tag, setTag] = useState("");
	const [tags, setTags] = useState<ITag[]>([]);

	const [restaurante, setRestaurante] = useState("");
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	const [imagem, setImagem] = useState<File | null>(null);

	useEffect(() => {
		axiosBaseURL
			.get<{ tags: ITag[] }>("tags/")
			.then(resposta => setTags(resposta.data.tags));
		axiosBaseURL
			.get<IRestaurante[]>("restaurantes/")
			.then(resposta => setRestaurantes(resposta.data));
	}, []);

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

		const formData = new FormData();

		formData.append("nome", nomePrato);
		formData.append("descricao", descricao);
		formData.append("tag", tag);
		formData.append("restaurante", restaurante);
		if (imagem) {
			formData.append("imagem", imagem);
		}

		axiosBaseURL
			.request({
				url: "pratos/",
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: formData,
			})
			.then(() => {
				setNomePrato("");
				setDescricao("");
				setTag("");
				setRestaurante("");
				alert("Prato cadastrado com sucesso");
			})
			.catch(error => console.log(error));
	};

	const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.length) {
			setImagem(event.target.files[0]);
		} else {
			setImagem(null);
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
								Formulário de Pratos
							</Typography>
							<TextField
								value={nomePrato}
								onChange={evento => setNomePrato(evento.target.value)}
								id="standard-basic"
								label="Nome do Prato"
								variant="standard"
								fullWidth
								required
								margin="dense"
							/>
							<TextField
								value={descricao}
								onChange={evento => setDescricao(evento.target.value)}
								id="standard-basic"
								label="Descrição do Prato"
								variant="standard"
								fullWidth
								required
								margin="dense"
							/>

							<FormControl margin="dense" fullWidth>
								<InputLabel id="select-tag">Tag</InputLabel>
								<Select
									labelId="select-tag"
									value={tag}
									onChange={evento => setTag(evento.target.value)}
								>
									{tags.map(tag => (
										<MenuItem key={tag.id} value={tag.value}>
											{tag.value}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl margin="dense" fullWidth>
								<InputLabel id="select-restaurante">Restaurante</InputLabel>
								<Select
									labelId="select-restaurante"
									value={restaurante}
									onChange={evento => setRestaurante(evento.target.value)}
								>
									{restaurantes.map(restaurante => (
										<MenuItem key={restaurante.id} value={restaurante.id}>
											{restaurante.nome}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<input type="file" onChange={selecionarArquivo} />

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
