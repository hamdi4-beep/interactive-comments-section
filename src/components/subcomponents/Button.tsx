function Button(props: {
    iconImage: string
    label: string
    clickHandler: React.MouseEventHandler
}) {
    return (
        <button onClick={props.clickHandler}>
            <div className="icon-img">
                <img src={props.iconImage} alt="" />
            </div>
    
            {props.label}
        </button>
    )
}

export default Button