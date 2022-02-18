var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    fontWeight:"400px",
    letterSpacing : "1px"
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

function Footer({ children }) {
    return (
        <div>
            <div div className="my-4 d-inline-block"> </div>

            <div style={phantom} />
            <div style={style}>
                {children}
                © 2022 Copyright: inotes.com By Yash_Vora   
            </div>
        </div>
    )
}

export default Footer