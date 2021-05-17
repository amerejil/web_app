import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="section_footer">
      <div className="footer_container">
        <div className="left_footer">
          <div>
            <Link href="#sect-1">
              <a className="left_footer_link">Inicio</a>
            </Link>
          </div>
          <div>
            <Link href="#sect-2">
              <a className="left_footer_link">Categorías</a>
            </Link>
          </div>
          <div>
            <Link href="/terms">
              <a className="left_footer_link">Términos y condiciones</a>
            </Link>
          </div>
        </div>
        <div className="center_footer">
          <div>
            <i className="fab fa-whatsapp"></i>0962588254
          </div>
          <div>
            <i className="far fa-envelope"></i>Info2@mail.com
          </div>
          <div>
            <i className="far fa-clock"></i>09h00am a 06h30pm
          </div>
        </div>
        <div className="right_footer">
          <span>Síguenos en </span>
          <a href="https://www.facebook.com/ElPorcelanito" target="_blank">
            <i className="fab fa-facebook "></i>
          </a>
          <a
            href="https://www.instagram.com/porcelanito/?hl=es-la"
            target="_blank"
          >
            <i className="fab fa-instagram "></i>
          </a>
        </div>
      </div>

      <div></div>
      <div class="copyright-container">© 2021 El Porcelanito</div>
    </footer>
  );
}
