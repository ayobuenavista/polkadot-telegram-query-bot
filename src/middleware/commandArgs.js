module.exports = () => {
  return (ctx, next) => {
    if (ctx.updateType === 'message' && ctx.updateSubTypes.includes('text')) {
      let text = ctx.update.message.text.toLowerCase();
      let match;

      if (text.startsWith('/')) {
        text = text.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
        match = text.match(/^\/([^\s]+)\s?(.+)?/);
        let args = [];
        let command;

        if (match !== null) {
          if (match[1]) {
            command = match[1];
          }
          if (match[2]) {
            args = match[2].split(' ');
          }
        }

        ctx.state.command = {
          raw: text,
          command,
          args,
        };
      }
    }

    return next();
  };
};
