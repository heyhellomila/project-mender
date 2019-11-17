exports.pluralize = function (count, singular, plural) {
    if (count === 1) {
      return `${count} ${singular}`;
    }
    plural = plural || `${singular}s`;
    return `${count} ${plural}`;
  };