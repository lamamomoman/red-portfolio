import React from "react";

function Footer() {
    return <div id="footer-section">
        <div id="footer-section-content">
            <div id="top-section">
                <div id="heading">
                    <h1>With lines of code, our visions unfold,
                        Designing the world, a tale yet untold.</h1>
                </div>
                <div id="location">
                    <h2 className="faded">40.742978°N 74.152911°W</h2>
                    <h2>Harrison, NJ, US.</h2>
                </div>
            </div>

            <div id="middle-section">
                <div id="middle-left">
                    <h2 className="faded">Say HI!!</h2>
                    <a href="mailto:redmaniac0510@gmail.com" className="email">redmaniac0510@gmail.com</a>
                </div>
                <div id="middle-right">
                    <div id="social-media">
                        <div className="social">
                            <img alt="NA" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO3YrUqFQRSG0Y0KIlgU1GQTbFbBK7R7AXaDXfBEtfkTBJtJsFj0ApaIk04X2cO76qQHZubb81VFRERERMQ/wjUesVud4cavJ2xXV9jB84h5wFZ1hT28jJhbbFZX2MfriFlgo7rCAd5GzBXWqysc4n3EXGKtusIRPkbMBVarKxzjc8ScY6W6wgm+RszZ8uLPjdDV6fJI0D9kmq3VhRkOuxmuXzN8EM0wophhaDTDGG+WhxXuZnnqLnDf/udDRERERET9hW+O88TtYu+D0QAAAABJRU5ErkJggg==" />
                            <a href="https://linkedin.com">LinkedIn</a>
                        </div>
                        <div className="social">
                            <img alt="NA" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO3YrUqFQRSG0Y0KIlgU1GQTbFbBK7R7AXaDXfBEtfkTBJtJsFj0ApaIk04X2cO76qQHZubb81VFRERERMQ/wjUesVud4cavJ2xXV9jB84h5wFZ1hT28jJhbbFZX2MfriFlgo7rCAd5GzBXWqysc4n3EXGKtusIRPkbMBVarKxzjc8ScY6W6wgm+RszZ8uLPjdDV6fJI0D9kmq3VhRkOuxmuXzN8EM0wophhaDTDGG+WhxXuZnnqLnDf/udDRERERET9hW+O88TtYu+D0QAAAABJRU5ErkJggg==" />
                            <a href="https://github.com/orangeappleak">Github</a>
                        </div>
                        <div className="social">
                            <img alt="NA" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO3YrUqFQRSG0Y0KIlgU1GQTbFbBK7R7AXaDXfBEtfkTBJtJsFj0ApaIk04X2cO76qQHZubb81VFRERERMQ/wjUesVud4cavJ2xXV9jB84h5wFZ1hT28jJhbbFZX2MfriFlgo7rCAd5GzBXWqysc4n3EXGKtusIRPkbMBVarKxzjc8ScY6W6wgm+RszZ8uLPjdDV6fJI0D9kmq3VhRkOuxmuXzN8EM0wophhaDTDGG+WhxXuZnnqLnDf/udDRERERET9hW+O88TtYu+D0QAAAABJRU5ErkJggg==" />
                            <a href="https://www.instagram.com/lama_momo_man/">Instagram</a>
                        </div>
                        <div className="social">
                            <img alt="NA" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO3YrUqFQRSG0Y0KIlgU1GQTbFbBK7R7AXaDXfBEtfkTBJtJsFj0ApaIk04X2cO76qQHZubb81VFRERERMQ/wjUesVud4cavJ2xXV9jB84h5wFZ1hT28jJhbbFZX2MfriFlgo7rCAd5GzBXWqysc4n3EXGKtusIRPkbMBVarKxzjc8ScY6W6wgm+RszZ8uLPjdDV6fJI0D9kmq3VhRkOuxmuXzN8EM0wophhaDTDGG+WhxXuZnnqLnDf/udDRERERET9hW+O88TtYu+D0QAAAABJRU5ErkJggg==" />
                            <a href="https://discordapp.com/users/449767434103291914">Discord</a>
                        </div>
                        <div className="social">
                            <img alt="NA" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO3YrUqFQRSG0Y0KIlgU1GQTbFbBK7R7AXaDXfBEtfkTBJtJsFj0ApaIk04X2cO76qQHZubb81VFRERERMQ/wjUesVud4cavJ2xXV9jB84h5wFZ1hT28jJhbbFZX2MfriFlgo7rCAd5GzBXWqysc4n3EXGKtusIRPkbMBVarKxzjc8ScY6W6wgm+RszZ8uLPjdDV6fJI0D9kmq3VhRkOuxmuXzN8EM0wophhaDTDGG+WhxXuZnnqLnDf/udDRERERET9hW+O88TtYu+D0QAAAABJRU5ErkJggg==" />
                            <a href="https://tracker.gg/valorant/profile/riot/SpooderMoan%234347/overview">Valo Stats</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bottom-section">
                <p>Copyright © 2024 Karthik.A. All rights reserved.

                    <span className="faded"> Design and Development by Karthik.A</span></p>
            </div>

        </div>
    </div>
}

export default Footer;