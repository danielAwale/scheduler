import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewList(props) {
  const interviewers = props.interviewers.map(interview => {
    return (
      <InterviewerListItem
        key={interview.id}
        name={interview.name}
        avatar={interview.avatar}
        selected={interview.id === props.interview}
        setInterviewer={props.setInterviewer}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}
