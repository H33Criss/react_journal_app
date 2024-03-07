import { Grid, Typography } from "@mui/material";
import { CustomParticles } from "../../ui/particles";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout = ({ children, title = "" }: Props) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <CustomParticles />

      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Grid justifyContent="center" container>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
        </Grid>

        {children}
      </Grid>
    </Grid>
  );
};
