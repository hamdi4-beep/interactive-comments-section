function ScoreComponent(props: {
    score: number
}) {
    return (
        <div className="score-component">
            <button>
                <div className="icon-img">
                    <img src="/interactive-comment-section/images/icon-plus.svg" alt="" />
                </div>
            </button>

            <span>{props.score}</span>

            <button>
                <div className="icon-img">
                    <img src="/interactive-comment-section/images/icon-minus.svg" alt="" />
                </div>
            </button>
        </div>
    )
}

export default ScoreComponent