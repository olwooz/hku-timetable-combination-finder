const CourseOption = (props) => {
  const children = props.children;

  if (!children.length) {
    return <div className="course-option">{children}</div>;
  }

  return (
    <div className="course-option">
      {children.length &&
        children.map((key, i) => {
          delete key.props.innerProps.onMouseMove;
          delete key.props.innerProps.onMouseOver;

          return (
            <div className="course-item" key={i}>
              {key}
            </div>
          );
        })}
    </div>
  );
};

export default CourseOption;
