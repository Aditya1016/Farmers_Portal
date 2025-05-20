import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="full-rounded">
        <span className='text-xl'>Get Started <i className="ri-arrow-right-line"></i></span>
        <div className="border full-rounded" /></button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   font-size: 16px;
   position: relative;
   margin: auto;
   padding: 1em 2.5em 1em 2.5em;
   border: none;
   background: #00ff00;
   transition: all 0.1s linear;
   box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  }

  button:active {
   transform: scale(0.95);
  }

  button span {
   color: #464646;
  }

  button .border {
   position: absolute;
   border: 0.15em solid #fff;
   transition: all 0.3s 0.08s linear;
   top: 50%;
   left: 50%;
   width: 11.9em;
   height: 3em;
   transform: translate(-50%, -50%);
  }

  button:hover .border {
   display: block;
   width: 12.9em;
   height: 3.7em;
  }

  .full-rounded {
   border-radius: 2em;
  }`;

export default Button;
