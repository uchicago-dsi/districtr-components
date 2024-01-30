module.exports = {
  roots: ['src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testPathIgnorePatterns: ['node_modules/'],
  transformIgnorePatterns: ['/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run.
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^d3-(.*)$': `d3-$1/dist/d3-$1`
  }
}
