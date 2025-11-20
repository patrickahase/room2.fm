export default function Marquee(props) {

  const marqueeStyle = {
    wrapper: {
      overflow: 'hidden',
      width: '100%',
      backgroundColor: 'var(--comp-col-01)',
      color: 'var(--comp-col-02)'
    },
    text: {
      width: 'max-content',
      position: 'relative',
      fontSize: '8vh',
      right: '110%'
    }
  }
  
  return (
    <div id="marquee-wrapper" style={marqueeStyle.wrapper}>
      <div id="marquee-text" style={marqueeStyle.text}>
        <span className='MarqueeText'>{props.text} <a href="https://www.mixcloud.com/hopestradio/121221-intelligent-muzak-with-anuraag/" target='_blank' rel="noreferrer">responses made while listening to this mix</a> {props.text}</span>
        <span className='MarqueeText'>{props.text} <a href="https://www.mixcloud.com/hopestradio/121221-intelligent-muzak-with-anuraag/" target='_blank' rel="noreferrer">responses made while listening to this mix</a> {props.text}</span>
        <span className='MarqueeText'>{props.text} <a href="https://www.mixcloud.com/hopestradio/121221-intelligent-muzak-with-anuraag/" target='_blank' rel="noreferrer">responses made while listening to this mix</a> {props.text}</span>
        <span className='MarqueeText'>{props.text} <a href="https://www.mixcloud.com/hopestradio/121221-intelligent-muzak-with-anuraag/" target='_blank' rel="noreferrer">responses made while listening to this mix</a> {props.text}</span>
      </div>
    </div>
    
  )
}

