/**
 * 😼 Summary: **leteChain** helps you define dependencies among your libraries, so that **letePick** can pick all the items in the chain automatically.  
 * 😼 Usage: call **leteChain** from your *library* file.  
 * @param {*} item Your exported artifact, eg. functions, objects, classes.
 * @param  {import("../../userdata/libs").LibIdsType[] | import("../../userdata/libs").LibIdsType} dependencyIds Could be one single dependency ID or an array of them.
 */
export function leteChain(item, dependencyIds) {
  if (dependencyIds && !Array.isArray(dependencyIds))
    dependencyIds = [dependencyIds];

  if (["function","object"].includes(typeof item)) {
    item._leteChain = dependencyIds;
  }
}