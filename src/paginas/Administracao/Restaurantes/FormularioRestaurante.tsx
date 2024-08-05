import { Button, TextField } from "@mui/material";

const FormularioRestaurante = () => {
	return (
		<form>
			<TextField id="standard-basic" label="Standard" variant="standard" />
			<Button variant="outlined">Outlined</Button>
		</form>
	);
};

export default FormularioRestaurante;
