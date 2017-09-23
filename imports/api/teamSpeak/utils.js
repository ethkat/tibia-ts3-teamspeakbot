export const mapTsError = ({ error }) => ({
  message: `${error.id ? `Error id: ${error.id} - ` : ''} ${error.msg} - ${error.extra_msg}`,
});
