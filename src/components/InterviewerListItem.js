import React from 'react'
import 'components/InterviewerListItem.scss'
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item": !props.selected,
  })

  let stylingImage = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
    "interviewers__item-image": !props.selected
  })

  return (
    <li
      onClick={props.setInterviewer}
      className={interviewerClass}>

      <img className={stylingImage}
        src={props.avatar}
        alt={props.name} />
      {props.selected && props.name}
    </li>
  )
}
