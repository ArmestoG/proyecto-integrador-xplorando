import './Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer__left">
          <img src="/src/assets/logofinalexplorando/logoxplorando/logoxplorando.png" alt="Isologotipo Xplorando" />
          <p>&copy; {new Date().getFullYear()} Xplorando. Equipo#4</p>
        </div>
        <div className="footer__right">
        <span>fb</span>
        <span>ig</span>
        <span>in</span>
        <span>X</span>
      </div>
      </footer>
    );
  }
  
  export default Footer;