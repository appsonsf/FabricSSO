using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;
using ServiceFabricContrib;
using Sso.Remoting.Models;

namespace Sso.Remoting
{
    public class CsvUserItemDtoMapper : ClassMap<UserItemDto>
    {
        public CsvUserItemDtoMapper()
        {
            AutoMap();
            this.Map(u => u.Id).TypeConverter<ItemIdTypeConvert>().Name("Id");
        }
    }

    public class ItemIdTypeConvert : ITypeConverter
    {
        public string ConvertToString(object value, IWriterRow row, MemberMapData memberMapData)
        {
            if (value is ItemId castValue)
                return castValue.ToString();
            return string.Empty;
        }

        public object ConvertFromString(string text, IReaderRow row, MemberMapData memberMapData)
        {
            return new ItemId(Guid.Parse(text));
        }
    }
}
