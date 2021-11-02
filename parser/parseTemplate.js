const { parseEvents, matchTagAttribute } = require('../utils');

const parseSlots = template => {
  const slots = matchTagAttribute(template, 'slot', 'name');

  if (slots.length === 0) return null;

  return slots.map(item => ({ key: item === undefined ? 'default' : item }));
};

const parseTemplate = templateSource => {
  const slots = parseSlots(templateSource);
  const events = parseEvents(templateSource);

  return {
    slots,
    events,
  };
};

module.exports = parseTemplate;
