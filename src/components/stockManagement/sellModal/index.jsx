export default function SellModal({ setModalIsOpen, setShouldReloadPage }) {

    function addToPortfolio() {
      setModalIsOpen(false)
      if (setShouldReloadPage) {
        setShouldReloadPage(true);
      }
    }
  
    function withdraw() {
      setModalIsOpen(false)
      if (setShouldReloadPage) {
        setShouldReloadPage(true);
      }
    }
  
    return (
      <div>
        <h2 className="title-sell-modal">Confirm action</h2>
        <hr className="hr-sell-modal" />
        <div className="button-place">
          <button className="button margin-right" onClick={addToPortfolio}>Add to portfolio</button>
          <button className="button" onClick={withdraw}>Withdraw</button>
        </div>
      </div>
    );
  }
