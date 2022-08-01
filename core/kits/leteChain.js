/**
 * @param {*} item 
 * @param  {import("../../userdata/libs").LibIdsType[] | import("../../userdata/libs").LibIdsType} dependencyIds 
 */
export function leteChain(item, dependencyIds) {
  if (dependencyIds && !Array.isArray(dependencyIds))
    dependencyIds = [dependencyIds];

  if (["function","object"].includes(typeof item)) {
    item._leteChain = dependencyIds;
  }
}