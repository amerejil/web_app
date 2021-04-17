import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <title>El porcelanito</title>
      <Component {...pageProps} />
    </>
  );
}
