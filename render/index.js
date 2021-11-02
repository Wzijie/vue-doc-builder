const getLineBreak = (boolean, length = 1) => (boolean ? '\n'.repeat(length) : '');

const renderTable = options => {
  const { title, columns } = options;

  const header = columns.reduce((prev, { label }) => `${prev} ${label} |`, '|');

  const divider = header.replace(/[\w\u4e00-\u9fa5]/g, '-');

  const getLine = itemData => {
    return columns.reduce((prev, { key }) => `${prev} ${itemData[key] === undefined ? '-' : itemData[key]} |`, '|');
  };

  return data => {
    const dataCols = data.reduce((prev, current, index) => {
      return `${prev}${getLineBreak(index !== 0)}${getLine(current)}`;
    }, '');

    const template = `### ${title}

${header}
${divider}
${dataCols}`;

    return template;
  };
};

const renderName = name => {
  return `# ${name}`;
};

const renderData = renderTable({
  title: 'Data',
  columns: [
    { key: 'key', label: 'key' },
    { key: 'description', label: 'description' },
    { key: 'defaultValue', label: 'defaultValue' },
    { key: 'type', label: 'type' },
  ],
});

const renderMethods = renderTable({
  title: 'Methods',
  columns: [
    { key: 'key', label: 'key' },
    { key: 'description', label: 'description' },
    { key: 'arguments', label: 'arguments' },
  ],
});

const renderProps = renderTable({
  title: 'Props',
  columns: [
    { key: 'key', label: 'key' },
    { key: 'description', label: 'description' },
    { key: 'type', label: 'type' },
    { key: 'defaultValue', label: 'defaultValue' },
    { key: 'required', label: 'required' },
  ],
});

const renderEvents = renderTable({
  title: 'Events',
  columns: [
    { key: 'key', label: 'key' },
    { key: 'description', label: 'description' },
    { key: 'arguments', label: 'arguments' },
  ],
});

const renderSlots = renderTable({
  title: 'Slots',
  columns: [
    { key: 'key', label: 'key' },
    { key: 'description', label: 'description' },
  ],
});

const renderList = [
  { key: 'name', handler: renderName },
  { key: 'data', handler: renderData },
  { key: 'props', handler: renderProps },
  { key: 'methods', handler: renderMethods },
  { key: 'events', handler: renderEvents },
  { key: 'slots', handler: renderSlots },
];

const render = dataMap => {
  const result = renderList
    .filter(({ key }) => dataMap[key])
    .reduce((prev, { key, handler }, index) => {
      return `${prev}${getLineBreak(index !== 0, 2)}${handler(dataMap[key])}`;
    }, '');

  return result;
};

module.exports = render;
