class V1::CinController < ApplicationController

  LISTING_STATUS={'L'=>'Listed','U'=>'Unlisted'}
  STATE_CODE={
      'AP'=>'ANDHRA PRADESH',
      'AR'=>'ARUNACHAL PRADESH',
      'AS'=>'ASSAM',
      'BR'=>'BIHAR',
      'CG'=>'CHHATTISGARH',
      'DL'=>'DELHI',
      'GA'=>'GOA',
      'GJ'=>'GUJARAT',
      'HR'=>'HARYANA',
      'HP'=>'HIMACHAL PRADESH',
      'JK'=>'JAMMU & KASHMIR',
      'JS'=>'JHARKHAND',
      'KA'=>'KARNATAKA',
      'KL'=>'KERALA',
      'MP'=>'MADHYA PRADESH',
      'MH'=>'MAHARASHTRA',
      'MN'=>'MANIPUR',
      'ML'=>'MEGHALAYA',
      'MZ'=>'MIZORAM',
      'NL'=>'NAGALAND',
      'OR'=>'ORISSA',
      'PB'=>'PUNJAB',
      'RJ'=>'RAJASTHAN',
      'SK'=>'SIKKIM',
      'TN'=>'TAMIL NADU',
      'UK'=>'UTTARAKHAND',
      'UP'=>'UTTAR PRADESH',
      'WB'=>'WEST BENGAL',
      'AN'=>'ANDAMAN & NICOBAR',
      'CH'=>'CHANDIGARH',
      'DN'=>'DADRA AND NAGAR HAVELI',
      'DD'=>'DAMAN & DIU',
      'LD'=>'LAKSHADWEEP',
      'PY'=>'PONDICHERRY',
  }
  OWNERSHIP_STATUS ={
      'PTC'=>'Private Limited Company',
      'PLC'=>'Public Limited Company',
      'GOI'=>'Companies owned by Government of India',
      'SGC'=>'Companies owned by State Government',
      'FLC'=>'Financial Lease Company (as Public Limited)',
      'GAP'=>'General Association Public',
      'GAT'=>'General Association Private',
      'NPL'=>'Not For Profit License Company',
      'ULL'=>'Public Limited Company (unlimited liability)',
      'ULT'=>'Private Limited Company ((unlimited liability)',
      'FTC'=>'Subsidiary of a Foreign Company',
  }

    def index
    end

    def search
        valid = false
        if params[:number].length == 21
            listing = LISTING_STATUS[params[:number][0]]
            if listing
                industry_code = params[:number][1..5]
                if is_numeric?(industry_code)
                    state = STATE_CODE[params[:number][6..7]]
                    if state
                        year = params[:number][8..11]
                        if is_numeric?(year) && year.to_i <= Time.current.year
                            ownership = OWNERSHIP_STATUS[params[:number][12..14]]
                            if ownership
                                reg_no = params[:number][15..20]
                                if is_numeric?(reg_no)
                                    valid = true
                                    current_user.search_history.create(search_key: params[:number])
                                    current_user.search_history.first.destroy if current_user.search_history.count > 100 # Deleting old search history
                                end
                            end
                        end
                    end
                end
            end
        end
        render json: { cin: { valid: valid, listing: listing, industry_code: industry_code, state: state, year: year, ownership: ownership, reg_no: reg_no } }.to_json
    end

    def search_history
        render json: { search_history: current_user.search_history.reverse }.to_json
    end

    def is_numeric?(value)
        Float(value) != nil rescue false
    end
end
