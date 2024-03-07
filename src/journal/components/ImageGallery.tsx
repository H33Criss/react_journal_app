import { ImageListItem, ImageList } from "@mui/material";
interface Props {
  images: string[];
}

export const ImageGallery = ({ images }: Props) => {
  return (
    <ImageList
      sx={{
        width: {
          xs: "100%",
          lg: "75%",
        },
        height: 500,
      }}
      cols={4}
      rowHeight={200}
    >
      {images.map((img, i) => (
        <ImageListItem key={i}>
          <img
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt=""
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
